#!groovy
@Library('Reform')
import uk.gov.hmcts.Ansible
import uk.gov.hmcts.Packager
import uk.gov.hmcts.RPMTagger

properties(
  [[$class: 'GithubProjectProperty', projectUrlStr: 'http://git.reform.hmcts.net/fees-register/fees-register-admin-web'],
   pipelineTriggers([[$class: 'GitHubPushTrigger']])]
)

Ansible ansible = new Ansible(this, 'ccfr_admin')
Packager packager = new Packager(this, 'cc')

timestamps {
  milestone()
  lock(resource: "fees-register-admin-web-${env.BRANCH_NAME}", inversePrecedence: true) {
    node('slave') {
      try {
        stage('Checkout') {
          deleteDir()
          checkout scm
        }

        stage('Setup') {
          sh '''
            yarn install
            yarn setup
          '''
        }

        stage('Lint') {
          sh "yarn run lint"
        }

        stage('Node security check') {
          try {
            sh "yarn test:nsp 2> nsp-report.txt"
          } catch (ignore) {
            sh "cat nsp-report.txt"
            archiveArtifacts 'nsp-report.txt'
            error "Node security check failed see the report for the errors"
          }
          sh "rm nsp-report.txt"
        }

        stage('Test') {
          try {
            sh "yarn test"
          } finally {
            archiveArtifacts 'mochawesome-report/unit.html'
          }
        }

        stage('Test routes') {
          try {
            sh "yarn test:routes"
          } finally {
            archiveArtifacts 'mochawesome-report/routes.html'
          }
        }

        stage('Test a11y') {
          try {
            sh "yarn test:a11y"
          } finally {
            archiveArtifacts 'mochawesome-report/a11y.html'
          }
        }

        def feesAdminWebDockerVersion

        stage('Build Docker') {
          feesAdminWebDockerVersion = dockerImage imageName: 'fees-register/fees-admin-web'
        }



        onMaster {
          def rpmVersion

          stage('Publish RPM') {
            rpmVersion = packager.nodeRPM('fees-register-admin-web')
            packager.publishNodeRPM('fees-register-admin-web')
          }

          stage('Deploy (Dev)') {
            ansible.runDeployPlaybook("{fees_register_admin_version: ${rpmVersion}}", 'dev')
            RPMTagger rpmTagger = new RPMTagger(this, 'fees-register-admin-web', packager.rpmName('fees-register-admin-web', rpmVersion), 'cc-local')
            rpmTagger.tagDeploymentSuccessfulOn('dev')
          }

          stage('Deploy (Test)') {
            ansible.runDeployPlaybook("{fees_register_admin_version: ${rpmVersion}}", 'test')
            RPMTagger rpmTagger = new RPMTagger(this, 'fees-register-admin-web', packager.rpmName('fees-register-admin-web', rpmVersion), 'cc-local')
            rpmTagger.tagDeploymentSuccessfulOn('test')
          }
        }
      } catch (Throwable err) {
        notifyBuildFailure channel: '#cc-payments-tech'
        throw err
      }
    }
    milestone()
  }
}
