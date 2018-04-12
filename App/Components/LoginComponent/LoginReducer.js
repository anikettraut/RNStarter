import ACTION_TYPES from '../../Action/ActionsType';
const INITIAL_STATE = {
	signInUsername:'',
	signInPassword:'',
	getTokenResp:'',
	getExternalLoginsResp:'',
	signupFirstName:'',
	signupLastName:'',
	singupEmail:'',		
	signupPassword:'',
	signupConfirmPassword:'',
	registerRes:'',	 
	loggedInUserDetail:'',
	userAuthorize: false,
}


export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		
		case ACTION_TYPES.SIGNIN_USERNAME_CHANGED:
			return {...state,signInUsername:action.payload}

		case ACTION_TYPES.SIGNIN_PASSWORD_CHANGED:
			return {...state,signInPassword:action.payload}

		case ACTION_TYPES.SIGNUP_FIRSTNAME_CHANGED:
			return {...state,signupFirstName:action.payload}

		case ACTION_TYPES.SIGNUP_LASTNAME_CHANGED:
			return {...state,signupLastName:action.payload}

		case ACTION_TYPES.SIGNUP_EMAIL_CHANGED:
			return {...state,singupEmail:action.payload}
			
		case ACTION_TYPES.SIGNUP_PASSWORD_CHANGED:
			return {...state, signupPassword: action.payload}

		case ACTION_TYPES.SIGNUP_CONFIRM_PASSWORD_CHANGED:
			return {...state, signupConfirmPassword: action.payload}

		case ACTION_TYPES.REGISTER_USER_RES:
			return {...state, registerRes: action.payload}

		case ACTION_TYPES.CLEAR_REGISTER_USER_RESPONSE:
			return {...state, registerRes: ''}

		case ACTION_TYPES.GET_TOKEN_RES:
			return {...state, getTokenResp: action.payload}

		case ACTION_TYPES.CLEAR_GET_TOKEN_RESPONSE:
			return {...state, getTokenResp: ''}

		case ACTION_TYPES.GET_EXT_TOKEN_RES:
			return {...state, getExternalLoginsResp: action.payload}

		case ACTION_TYPES.CLEAR_GET_EXT_TOKEN_RESPONSE:
			return {...state, getExternalLoginsResp: ''}

		case ACTION_TYPES.LOGGED_IN_USER_DETAIL_RESP:
			return {...state, loggedInUserDetail: action.payload}

		case ACTION_TYPES.CLEAR_LOGGED_IN_USER_DETAIL_RESPONSE:
			return {...state, loggedInUserDetail: ''}

		case ACTION_TYPES.USER_AUTHENTICATED:
			return {...state,userAuthorize:action.payload}		

		default:
			return state;
	}

};