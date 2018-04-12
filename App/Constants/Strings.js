const STRINGS = {

	//*********************Constant Strings**********************//
	USERNAME:'Username',
	PASSWORD:'Password',
	BUTTON_LOGIN_TEXT:'LOG IN',
	FORGOT_PASS_TEXT:'Forgot Your Password?',
	LOGO_TEXT:'I',
	APP_TITLE_TEXT:'LeaseAgent',

	FIRST_NAME:'First Name',
	LAST_NAME:'Last Name',
	NAME:'Name',
	EMAIL_ADDRESS:'Email Address',
	CONFIRM_PASSWORD:'Confirm Password',
	BUTTON_REGISTER_TEXT:'REGISTER',

	DATE_OF_BIRTH:'Date Of Birth',
	DATE_FORMAT:'DD MMM YYYY',
	DATE_CONFIRM:'Confirm',
	DATE_CANCEL:'Cancel',

	PHONE_NUMBER:'Phone Number',
	LANDLINE_NUMBER:'Landline Number',

	MOBILE_PHONE_NUMBER:'Mobile',
	WORK_PHONE_NUMBER:'Work Number (Optional)',
	HOME_PHONE_NUMBER:'Home Number (Optional)',


	DRIVING_LICENCE_DETAILS:'Driving Licence Details',
	DRIVERS_LICENCE_NUMBER:'Drivers Licence Number',
	DRIVERS_LICENCE_STATE:'Drivers Licence State',
	DRIVERS_LICENCE_EXP_DATE:'Drivers Licence Expiry Date',

	PASSPORT_DETAILS:'Passport Details',
	PASSPORT_NUMBER:'Passport Number',
	PASSPORT_COUNTRY:'Passport Country',

	TITLE:'Title',
	SURNAME:'Surname',
	GIVEN_NAME:'First Name',

	BREED:'Breed/Type',
	REGISREARION_NO:'Registration No.',
	
	ADULTS:'No. of adults',
	CHILDREN:'No. of children',
	VEHICLES:'No. of vehicles',
	AGE:'age',
	NAME_OF_OTHER:'Name of other Appplicants',
	VEHICLE_NO:'Vehicle Registration No.',
	HOW_DID_YOU_HEAR:'How did you hear about this property?',
	ADDITIONAL_NOTE:'Additional Notes',
	
	AGENT_BUTTON_TITLE: 'I AM AN AGENT',
	TENANT_BUTTON_TITLE: 'I AM A TENANT',
	LANDLORD_BUTTON_TITLE: 'I AM A LANDLORD',

	SEARCH_HINT: 'Search Listing',

	kAGENT: 'Agent',
	kLANDLORD: 'Landlord',
	kTENANT: 'Tenant',

	
	NEW_OR_ESTABLISHED:'New or Established',
	INDOOR_FEATURES:'Indoor features',
	OUTDOOR_FEATURES:'Outdoor features',
	ECO_FRIENDLY:'Eco Friendly',

	MORE_FEATURES:'More features',

	SEARCH_ONLY_PREMIERE_PROPERTIES:'Search only Premiere properties',
	PETS_ALLOWED:'Pets allowed',
	FURNISHED:'Furnished',
	SMOKING_PERMITTED:'Smoking permitted',
	INCLUDE_SURROUNDING_SUBURBS:'Include surrounding suburbs',

	RENTAL_RESUME:'Rental Resume',		
	
	GENERAL_INFO:'Basic Profile',
	OTHER_INFORMATION:'Other Residents',	
	CURRENT_ADDRESS:'Residential Details',
	EMPLOYMENT_HISTORY:'Employment',
	IDENTIFICATION_DOC:'ID Documents',
	SUPPORTIVE_DOC:'Supporting Documents',
	CONTACTS_REF:'Personal Reference',
	PREVIOUS_RESIDENTIAL_ADDRESS:'Previous Address (Optional)',
	PETS:'Pets (Optional)',
	PREVIOUS_EMPLOYMENT_DETAILS:'Previous Employment (Optional)',	

	
	RENTAL_RESUME_GUIDE_FIRST:'Your Rental Resume looks incomplete, please fill it today!',
	RENTAL_RESUME_GUIDE_SECOND:'There are still some information left to complete your resume.',
	RENTAL_RESUME_GUIDE_THIRD:'Your rental resume is complete and verified you can download the complete pdf of rental resume by clicking the Button below.',

	WHAT_IS_YOUR_CURRENT_ADDRESS:'What is your current address?',
	SUBURB:'Suburb',
	POSTAL_CODE:'Postal Code',
	WHY_ARE_YOU_LEAVING_THIS_ADDRESS:'Why are you leaving this address?',
	DATE_MOVED_IN:'Date moved in',
	IS_THE_PROPERTY_AT_THIS_ADDRESS:'Is the property at this address:',
	LANDLORD_DETAILS:'Landlord Details',
	LANDLORD_NAME:'Landlord/ Agent Name',
	LANDLORD_CONTACT_NUMBER:'Landlord/ Agent Contact Number',
	LANDLORD_ADDRESS:'Landlord/ Agent Address',
	LANDLORD_EMAIL:'Landlord/ Agent Email',
	BOND_REFUND:'Bond Refund',
	WEEKLY_RENT:'Weekly rent ($)',

	WHAT_WAS_YOUR_RESIDENTIAL_ADDRESS:'What was your residential address?',
	WHY_DID_YOU_LEAVE_THIS_ADDRESS:'Why did you leave this address?',
	DATE_MOVED_OUT:'Date moved out',

	YOUR_CURRENT_EMPLOYMENT_STATUS:'Your current employment status',
	EMPLOYMENT_DETAILS:'Employment Details',
	OCCUPATION:'Occupation',
	EMPLOYMENT_TYPE:'Employment Type',
	EMPLOYERS_NAME:'Employers Name',
	EMPLOYERS_ADDRESS:'Employers Address',
	CONTACT_NAME:'Contact Name',

	SELF_EMPLOYMENT_DETAILS:'Self Employment Details',
	ADDRESS:'Address',

	LENGTH_OF_EMPLOYMENT:'Length of Employment',	
	WEEKLY_INCOME:'Weekly Income ($)',
	OTHER_INCOME:'Other Income ($)',

	PLEASE_PROVIDE_A_CONTATC_IN_CASE_OF_EMERGENCY:'Please provide a contact in case of emergency',
	RELATIONSHIP:'Relationship',
	PLEASE_PROVIDE_TWO_PERSONAL_REFERENCES:'Please provide two personal references',
	CONTACT_NUMBER:'Contact Number',

	PLEASE_PROVIDE_DETAILS:'Please provide details',
	OTHER_DETAILS:'Other details',

	SELECT_IDENTITY_PROOF:'Select Identity Proof',
	SELECT_SUPPORTIVE_PROOF:'Select Supportive Proof',
	SELECT_FILE_TO_UPLOAD:'Select file to upload',
	UPLOADED_FILES:'Uploaded files:',

	RENTAL_RESUME_ALERT_TITLE:'Your Rental Resume looks incomplete, please fill it today!',
	RENTAL_RESUME_ALERT_MESSAGE:'Create your Rental Resume to apply for as many properties as you like.',

	NUMBER_OF_APPLICANTS:'Number of applicants',

	NAME_THIS_SEARCH: 'Name this search (eg. places of work)',
	ALERT_ME: 'Alert Me',

	LOGOUT_CONFIRMATION_MSG: 'Are you sure you want to Logout?',
	
	CANCEL_BID_CONFIRMATION_MSG: 'Are you sure you want to cancel this bid?',

	//*********************Error Message*************************//
	ERROR_EMPTY_USER_NAME:'Please enter username',
	ERROR_EMPTY_PASSWORD:'Please enter password',
	ERROR_EMPTY_EMAIL:'Please enter email address',
	ERROR_INVALID_EMAIL:'Please enter valid email address',
	ERROR_INVALID_MOBILE:'Please enter valid mobile number',
	ERROR_EMPTY_FIRST_NAME:'Please enter first name',
	ERROR_EMPTY_LAST_NAME:'Please enter last name',
	ERROR_EMPTY_CONFIRM_PASSWORD:'Please confirm password',
	ERROR_PASSWORD_NOT_MATCHED:'Password and Confirm Password not match',

	ERROR_EMPTY_TITLE:'Please select Title',
	ERROR_EMPTY_SURNAME:'Please enter Surname',
	ERROR_EMPTY_GIVEN_NAME:'Please enter Givenname',
	ERROR_EMPTY_EMAIL:'Please enter Email address',
	ERROR_EMPTY_DOB:'Please select Date of Birth',
	ERROR_EMPTY_MOBILE_NO:'Please enter Mobile Phone Number',
	ERROR_EMPTY_WORK_NO:'Please enter Work Phone number',
	ERROR_EMPTY_HOME_NO:'Please enter Home Phone Number',

	ERROR_DRIVER_LICENSE_NO:'Please enter Driver License Number',
	ERROR_DRIVER_LICENSE_STATE:'Please enter Drivers License State',
	ERROR_DRIVER_LICENSE_EXP:'Please select Driver Licence Expiry Date',
	ERROR_PASSPORT_NO:'Please enter your Passport Number',
	ERROR_PASSPORT_COUNTRY:'Please enter your Passport Country',

	ERROR_EMPTY_NO_OF_ADULTS:'Please enter No. of adults',
	ERROR_EMPTY_NO_OF_CHILD:'Please enter No. of children',
	ERROR_EMPTY_NO_OF_VEHICLES:'Please enter No. of vehicles',

	ERROR_EMPTY_BREED_TYPE:'Please enter Breed/Type',
	ERROR_EMPTY_PET_NAME:'Please enter pet Name',
	ERROR_EMPTY_REGISTRATION_NO:'Please enter Registration No.',

	ERROR_EMPTY_ADDRESS:'Please enter address',
	ERROR_EMPTY_SUBURB:'Please enter suburb',
	ERROR_EMPTY_POSTALCODE:'Please enter postalCode',
	ERROR_EMPTY_LEAVING_REASON:'Please enter leaving reason',
	ERROR_EMPTY_MOVED_IN_DATE:'Please enter moved in date',
	ERROR_EMPTY_MOVED_OUT_DATE:'Please enter moved out date',

	ERROR_EMPTY_LANDLORD_CONTACT:'Please enter landlord contact number',
	ERROR_EMPTY_LANDLORD_NAME:'Please enter landlord name',
	ERROR_EMPTY_WEEKLY_RENT:'Please enter weekly rent',

	ERROR_EMPTY_EMP_CATEGORY:'Please select Employment Category',
	ERROR_EMPTY_OCCUPATION:'Please enter your Occupation',
	ERROR_EMPTY_COMPANY_NAME:'Please enter Company Name',
	ERROR_EMPTY_COMPANY_ADDRESS:'Please enter company address',	
	ERROR_EMPTY_CONTACT_NAME:'Please enter contact name',
	ERROR_EMPTY_CONTACT_NUMBER:'Please enter contact number',
	ERROR_EMPTY_YEARS:'Please enter years',
	ERROR_EMPTY_MONTHS:'Please enter months',
	ERROR_EMPTY_WEEKLY_INCOME:'Please enter weekly Income',
	ERROR_EMPTY_OTHER_INCOME:'Please enter other Income',

	ERROR_2_IDENTITY_PROOF:'Please upload at least 2 Identity Proof',
	ERROR_2__SUPPORT_IDENTITY_PROOF:'Please upload at least 2 Supportive Identity Proof',

	ERROR_EMPTY_NAME:'Please enter name',
	ERROR_EMPTY_RELATIONSHIP:'Please enter your relationship',
	ERROR_INCOMPLETE_RESUME:'Your rental resume looks incomplete, please complete and try again.'

}
export default STRINGS;
