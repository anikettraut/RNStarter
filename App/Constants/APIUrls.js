export const BASE_URL = 'http://108.168.203.227:9095/';

const API = {
	
	GET_TOKEN 						: 				BASE_URL+'token',
	LOGIN_SOCIAL					: 				BASE_URL+'api/Account/SocialRegisterExternal',	

	REGISTER_USER 	 				: 				BASE_URL+'api/Account/Register',
	GET_LOGGEDIN_USER_DETAILS 		: 				BASE_URL+'api/Account/GetLogedInUserDetails',
	
	CHANGE_PASSWORD 		 		: 				BASE_URL+'api/Account/ChangePassword',
	
	GET_INDOOR_FEATURE_LIST 		: 				BASE_URL+'api/Property/GetIndoorFeatureList',	
	GET_OUTDOOR_FEATURE_LIST 		: 				BASE_URL+'api/Property/GetOutdoorFeatureList',	
	
	GET_PROPERTY_INFO_BYSEARCH 		: 				BASE_URL+'api/Property/GetPropertyInfoBySearch',
	GET_PROPERTY_DETAILS 	 		: 				BASE_URL+'api/Property/GetPropertyDetails',

	SAVE_SEARCH_PROPERTY 			: 			 	BASE_URL+'api/Tenant/SaveSearchProperty',
	GET_SAVED_SEARCH_PROPERTY 		: 				BASE_URL+'api/Tenant/GetSavedSearchProperty',
	
	SAVE_FAV_PROPERTY 				: 				BASE_URL+'api/Tenant/SaveFavouriteProperty',

	GET_RENTAL_RESUME_STATES 		:  				BASE_URL+'api/Common/GetRentalResumeStates',
	
	GET_STATE_LIST 					:  				BASE_URL+'api/Rental/GetStatesList',
	GET_COUNTRY_LIST 				:  				BASE_URL+'api/Rental/GetCountryList',
	
	GET_TENANT_DETAILS 				:  				BASE_URL+'api/User/GetTenantDetails',
	GET_TENANT_RESIDENT_INFO 		:  				BASE_URL+'api/Rental/GetTenantResidentsInfo',
	GET_TENANT_PETS_INFO 			: 				BASE_URL+'api/Rental/GetTenantPetsInfo',
	GET_TENANT_CURRENT_RES_INFO 	: 				BASE_URL+'api/Rental/GetTenantCurrentResidential',
	GET_TENANT_PRE_RES_INFO     	: 				BASE_URL+'api/Rental/GetTenantPreviousResidential',	
	GET_TENANT_CURRENT_EMP      	: 				BASE_URL+'api/Rental/GetTenantCurrentEmployment',
	GET_TENANT_PREVIOUS_EMP     	: 				BASE_URL+'api/Rental/GetTenantPreviousEmployment',
	GET_TENANT_IDENT_DOCUMENT   	: 				BASE_URL+'api/Rental/GetTenantIdentificationDocu',
	GET_TENANT_SUPPORT_DOCUMENT 	: 				BASE_URL+'api/Rental/GetTenantSupportingDocu',
	GET_TENANT_PERSONAL_REF     	: 				BASE_URL+'api/Rental/GetTenantPersonalReference',

	UPDATE_TENANT_DETAILS 			:  				BASE_URL+'api/User/UpdateTenantDetails',
	UPDATE_TENANT_RESIDENT_INFO 	:  				BASE_URL+'api/Rental/AddUpdateTenantResidentsInfo',
	UPDATE_TENANT_PETS_INFO 		:  				BASE_URL+'api/Rental/AddUpdateTenantPetsInfo',
	UPDATE_TENANT_CURRENT_RES_INFO 	:  				BASE_URL+'api/Rental/AddUpdateTenantCurrentResidential',
	UPDATE_TENANT_PRE_RES_INFO 		:  				BASE_URL+'api/Rental/AddUpdateTenantPreviousResidential',
	UPDATE_TENANT_CURRENT_EMP 		:  				BASE_URL+'api/Rental/AddUpdateTenantEmployment',
	UPDATE_TENANT_PERSONAL_REF 		:  				BASE_URL+'api/Rental/AddUpdateTenantPersonalReference',
	UPLOAD_TENANT_IDENTITY_DOC		:				BASE_URL+'api/Rental/AddUpdateTenantIdentificationDocu',
	UPLOAD_MULTIPART_FILE			:				BASE_URL+'api/Rental/UploadMultipartFiles',
	
	DELETE_CO_APPLICANT_INFO 		:  				BASE_URL+'api/Rental/DeleteCoAppliocantInfo',
	DELETE_TENANT_PETS_INFO 		:  				BASE_URL+'api/Rental/DeletePetInfo',
	DELETE_TENANT_IDENT_DOCUMENT 	:  				BASE_URL+'api/Rental/DeleteIdentityDocument',
	

	SAVE_RENTAL_RESUME_PDF  		:  				BASE_URL+'api/Rental/SaveResumepdf',

	// GET_TOP_BIDDING_DETAILS 	 	:  				BASE_URL+'api/User/GettopBiddingDetails',
	GET_TOP_BIDDING_DETAILS 	 	:  				BASE_URL+'api/User/GetPropertyBidDetails',

	GET_TENANT_BIDDING_DETAILS 	 	:  				BASE_URL+'api/User/GetTenantBidDetails',
	SAVE_BID_INFO 				 	:  				BASE_URL+'api/User/SaveBidInfo',
	CANCEL_BID	 				 	:  				BASE_URL+'api/User/CancelBid',

	GET_BID_USER_DETAILS		 	:  				BASE_URL+'api/User/GetBidUserDetails',
	GET_TRANSACTIONS				:				BASE_URL+'api/Tenant/GetTenantPaymentExistOrNot',
	GET_BID_TENANT_DETAILS          : 				BASE_URL+'api/User/GetBidTenantDetails',
	
	GET_RENTAL_RESUME_PDF 			:     			BASE_URL + 'api/Rental/GetRentalResumePDF',
	GOOGLE_DOCS_VIEWER				:				'http://docs.google.com/gview?embedded=true&url=',
	GET_INSPECTIONS			     	:				BASE_URL+'api/Property/PropertyInspectionList',

}


export default API

