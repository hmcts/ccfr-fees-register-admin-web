provider "vault" {
  // # tactical vault - for example: use `data "vault_generic_secret" "s2s_secret" {`
  address = "https://vault.reform.hmcts.net:6200"
}

data "vault_generic_secret" "client_secret" {
  path = "secret/${var.vault_section}/ccidam/service-auth-provider/api/microservice-keys/freg"
}

module "fees-register-frontend" {
  source   = "git@github.com:hmcts/moj-module-webapp?ref=master"
  product  = "${var.product}-frontend"
  location = "${var.location}"
  env      = "${var.env}"
  ilbIp    = "${var.ilbIp}"
  subscription = "${var.subscription}"
  is_frontend  = true
  additional_host_name = "${var.external_host_name}"
  https_only = "true"

  app_settings = {
    IDAM_API_URL = "${var.idam_api_url}"
    IDAM_LOGIN_WEB_URL = "${var.authentication_web_url}"
    IDAM_AUTHENTICATION_WEB_URL = "${var.authentication_web_url}"
    FEES_URL = "http://fees-register-api-${var.env}.service.${data.terraform_remote_state.core_apps_compute.ase_name[0]}.internal"

    FEES_CLIENT_ID = "fees_admin_frontend"
    FEES_CLIENT_SECRET = "${data.vault_generic_secret.client_secret.data["value"]}"
  }
}
