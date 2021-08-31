import { RoutablePath } from 'common/router/routablePath'

export class Paths {
  static readonly loginReceiver = new RoutablePath('/admin/receiver', 'n/a')
  static readonly welcomePage = new RoutablePath('/admin/welcome', 'admin/views/welcome')

  static readonly categoryListPage = new RoutablePath('/admin/categories', 'admin/views/category-list')
  static readonly categoryCreatePage = new RoutablePath('/admin/categories/create', 'admin/views/category-create')
  static readonly categoryEditPage = new RoutablePath('/admin/categories/edit/:categoryCode', 'admin/views/category-edit')

  static readonly rangeGroupListPage = new RoutablePath('/admin/range-groups', 'admin/views/range-group-list')
  static readonly rangeGroupEditPage = new RoutablePath('/admin/range-groups/edit/:rangeGroupCode', 'admin/views/range-group-edit')
  static readonly rangeGroupCreatePage = new RoutablePath('/admin/range-groups/create', 'admin/views/range-group-create')
  static readonly rangeGroupPage = new RoutablePath('/admin/ranges-group/:rangeGroupCode', 'admin/views/range-group')

  static readonly allFeesPage = new RoutablePath('/admin/all-fees', 'admin/views/all-fees')


  static readonly feeListPage = new RoutablePath('/admin/fees', 'admin/views/fee-list')
  static readonly feeEditPage = new RoutablePath('/admin/fees/edit/:feeCode', 'admin/views/fee-edit')
  static readonly feeCreatePage = new RoutablePath('/admin/fees/create', 'admin/views/fee-create')
  static readonly healthInfoPage = new RoutablePath('/health', 'admin/views/health-info')
  static readonly unsecuredViewFees = new RoutablePath('/fees', 'admin/v2/views/external-fees')
  static readonly unsecuredViewFeeVersionHistory = new RoutablePath('/fees/:feeCode', 'admin/v2/views/fee')

  static readonly notFoundPage = new RoutablePath('n/a', 'admin/views/not-found')

  /* V2 */
  static readonly externalFeesV2 = new RoutablePath('/admin/v2/external-fees', 'admin/v2/views/external-fees')
  static readonly serviceListPage = new RoutablePath('/admin/v2/services', 'admin/v2/views/service-list')
  static readonly directionListPage = new RoutablePath('/admin/v2/directions', 'admin/v2/views/direction-list')
  static readonly channelListPage = new RoutablePath('/admin/v2/channels', 'admin/v2/views/channel-list')
  static readonly jurisdiction1ListPage = new RoutablePath('/admin/v2/jurisdictions1', 'admin/v2/views/jurisdiction1-list')
  static readonly jurisdiction2ListPage = new RoutablePath('/admin/v2/jurisdictions2', 'admin/v2/views/jurisdiction2-list')
  static readonly eventListPage = new RoutablePath('/admin/v2/events', 'admin/v2/views/event-list')
  static readonly applicantListPage = new RoutablePath('/admin/v2/applicants', 'admin/v2/views/applicant-list')
  static readonly referenceDataPage = new RoutablePath('/admin/v2/reference-data', 'admin/v2/views/reference-data')

  static readonly allFeesPageV2 = new RoutablePath('/admin/v2/all-fees', 'admin/v2/views/all-fees')
  static readonly allApprovedbutnotlivePageV2 = new RoutablePath('/admin/v2/all-approvedbutnotlive', 'admin/v2/views/all-approvedbutnotlive')
  static readonly pendingApprovalPageV2 = new RoutablePath('/admin/v2/pending-approval', 'admin/v2/views/pending-approval')
  static readonly discontinuedFeesPageV2 = new RoutablePath('/admin/v2/all-discontinued', 'admin/v2/views/all-discontinued')
  static readonly feeCreatePageV2 = new RoutablePath('/admin/v2/fees/create', 'admin/v2/views/create-edit-fee')
  static readonly feeDetailsViewPagev2 = new RoutablePath('/admin/v2/fee-details', 'admin/v2/views/fee-details')
  static readonly feeRejectReason = new RoutablePath('/admin/v2/reject-fee-reason/:feeCode/:feeVersion', 'admin/v2/views/reject-fee-reason')
  static readonly approvalConfirmationPageV2 = new RoutablePath('/admin/v2/approval-confirmation', 'admin//v2/views/approval-confirmation')
  static readonly myDraftFeesPageV2 = new RoutablePath('/admin/v2/draft-fees', 'admin/v2/views/draft-fees')
  static readonly myDraftRejectedByApproverV2 = new RoutablePath('/admin/v2/draft-rejectedbyapprover', 'admin/v2/views/draft-rejectedbyapprover')
  static readonly myDraftAwaitingApprovalV2 = new RoutablePath('/admin/v2/draft-awaitingapproval', 'admin/v2/views/draft-awaitingapproval')
  static readonly confirmDraftApprovalV2 = new RoutablePath('/admin/v2/confirm-draft-approval', 'admin/v2/views/confirm-draft-approval')
  static readonly approvalRequestConfirmationV2 = new RoutablePath('/admin/v2/approval-request-confirmation', 'admin/v2/views/approval-request-confirmation')
  static readonly draftDeleteAreYouSureV2 = new RoutablePath('/admin/v2/draft-delete-are-you-sure', 'admin/v2/views/draft-delete-are-you-sure')
  static readonly draftDeletedConfirmationV2 = new RoutablePath('/admin/v2/draft-deleted-confirmation', 'admin/v2/views/draft-deleted-confirmation')

  static readonly feeViewPagev2 = new RoutablePath('/admin/v2/fees/:feeCode', 'admin/v2/views/fee')
  static readonly feeVersions = new RoutablePath('/admin/v2/fee/versions/:feeCode', 'admin/v2/views/fee-versions')
  static readonly createFeeVersionPageV2 = new RoutablePath('/admin/v2/fees/version/create/:feeCode', 'admin/v2/views/create-fee-version')
  static readonly dashboard = new RoutablePath('/admin/v2/dashboard', 'admin/v2/views/dashboard')

  /* CSV upload */
  static readonly csvUploadPage = new RoutablePath('/admin/v2/upload', 'admin/v2/views/upload')
  static readonly csvImportFeePage = new RoutablePath('/admin/v2/upload', 'admin/v2/views/import-list')
  static readonly createBulkFeesPage = new RoutablePath('/admin/v2/bulkfeesupload', 'admin/v2/views/confirm-create-bulk-fees')
  static readonly csvToJsonPage = new RoutablePath('/admin/v2/tojson', 'admin/v2/views/fee-loader-json')

}
