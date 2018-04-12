import ACTION_TYPES from '../../Action/ActionsType';
import API from '../../Constants/APIUrls';

// Username TextField Value Change
export const signInUsernameChanged = (text) => {
	return {
		type: ACTION_TYPES.SIGNIN_USERNAME_CHANGED,
		payload : text
	}
};

// Password TextField Value Change
export const signInPasswordChanged = (text) => {
	return {
		type: ACTION_TYPES.SIGNIN_PASSWORD_CHANGED,
		payload : text
	}
};


// Firstname TextField Value Change
export const signupFirstNameChanged = (text) => {
	return {
		type: ACTION_TYPES.SIGNUP_FIRSTNAME_CHANGED,
		payload : text
	}
};

// Lastnama TextField Value Change
export const signupLastNameChanged = (text) => {
	return {
		type: ACTION_TYPES.SIGNUP_LASTNAME_CHANGED,
		payload : text
	}
};

// email TextField Value Change
export const signupEmailChanged = (text) => {
	return {
		type: ACTION_TYPES.SIGNUP_EMAIL_CHANGED,
		payload : text
	}
};

// Password TextField Value Change
export const signupPasswordChanged = (text) => {
	return {
		type: ACTION_TYPES.SIGNUP_PASSWORD_CHANGED,
		payload : text
	}
};

// Confirm Password TextField Value Change
export const signupConfirmPasswordChanged = (text) => {
	return {
		type: ACTION_TYPES.SIGNUP_CONFIRM_PASSWORD_CHANGED,
		payload : text
	}
};


// export const registerUser = (postData) => {

//   console.log('===========registerUser==============');
//   console.log(API.REGISTER_USER);
//   console.log('postdata==='+JSON.stringify(postData));
//   console.log('=========================');

//   var registerHeaderResponse = {};

//   return (dispatch) => {

//     //call the API and use the promise to check the response
//     // in response callBack .then() call the dispatcher.

//     fetch(API.REGISTER_USER, {
//       method: 'POST',
//       headers: {
//         'Accept'        : 'application/json',
//         'Content-Type'  : 'application/json',                
//       },
//       body: JSON.stringify(postData)
//     })
//     .then( (response) => {
//       console.log('*********************************************');
//       console.log('Received response registerUser API: ', response);
//       console.log('*********************************************');
//       registerHeaderResponse = response;
//       return response.json();
//     })
//     .then( (responseJSON) => {
//       console.log('*********************************************');
//       console.log('JSON response from registerUser API: ', responseJSON);
//       console.log('*********************************************');
//       var responseData ={
//       	data : responseJSON,
//       	headerResponse : registerHeaderResponse 
//       }
//       dispatch({
//         type      : ACTION_TYPES.REGISTER_USER_RES,
//         payload   : responseData
//       });

//     })
//     .catch(e => {
//       console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
//       console.log('Error: '+e);
//       console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

//     });
//   }

// };


export const clearRegisterUserResponse = () => ({
  type: ACTION_TYPES.CLEAR_REGISTER_USER_RESPONSE
});


// export const getToken = (postData) => {

//   console.log('===========getToken==============');
//   console.log(API.GET_TOKEN);
//   console.log('postdata==='+JSON.stringify(postData));
//   console.log('=========================');

//   var tokenHeaderResponse = {};

//   return (dispatch) => {

//     //call the API and use the promise to check the response
//     // in response callBack .then() call the dispatcher.

//     fetch(API.GET_TOKEN, {
//       method: 'POST',
//       headers: {        
//         'Content-Type'  : 'application/x-www-form-urlencoded',                
//       },
//       body: postData
//     })
//     .then( (response) => {
//       console.log('*********************************************');
//       console.log('Received response getToken API: ', response);
//       console.log('*********************************************');
//       tokenHeaderResponse = response;
//       return response.json();
//     })
//     .then( (responseJSON) => {
//       console.log('*********************************************');
//       console.log('JSON response from getToken API: ', responseJSON);
//       console.log('*********************************************');
//       var responseData ={
//       	data : responseJSON,
//       	headerResponse : tokenHeaderResponse 
//       }
//       dispatch({
//         type      : ACTION_TYPES.GET_TOKEN_RES,
//         payload   : responseData
//       });

//     })
//     .catch(e => {
//       var responseData ={
//         data : '',
//         headerResponse : tokenHeaderResponse 
//       }
//       dispatch({
//         type      : ACTION_TYPES.GET_TOKEN_RES,
//         payload   : responseData
//       });

//     });
//   }

// };


export const clearTokenResponse = () => ({
  type: ACTION_TYPES.CLEAR_GET_TOKEN_RESPONSE
});

export const clearExtTokenResponse = () => ({
  type: ACTION_TYPES.CLEAR_GET_EXT_TOKEN_RESPONSE
});



// export const getLoggedInUserDetails = (xauthtoken, postData) => {

//   console.log('===========getLoggedInUserDetails==============');
//   console.log(API.GET_LOGGEDIN_USER_DETAILS);
//   console.log('xauthtoken=== '+xauthtoken);
//   console.log('postdata==='+JSON.stringify(postData));
//   console.log('=========================');

//   var userDetailHeaderResponse = {};

//   return (dispatch) => {

//     //call the API and use the promise to check the response
//     // in response callBack .then() call the dispatcher.

//     fetch(API.GET_LOGGEDIN_USER_DETAILS, {
//       method: 'POST',
//       headers: {        
//         'Accept'        : 'application/json',
//         'Content-Type'  : 'application/json',   
//         'Authorization' : 'Bearer '+xauthtoken,             
//       },
//       body: JSON.stringify(postData)

//     })
//     .then( (response) => {
//       console.log('*********************************************');
//       console.log('Received response getLoggedInUserDetails API: ', response);
//       console.log('*********************************************');
//       userDetailHeaderResponse = response;
//       return response.json();
//     })
//     .then( (responseJSON) => {
//       console.log('*********************************************');
//       console.log('JSON response from getLoggedInUserDetails API: ', responseJSON);
//       console.log('*********************************************');
//       var responseData ={
//         data : responseJSON,
//         headerResponse : userDetailHeaderResponse 
//       }
//       dispatch({
//         type      : ACTION_TYPES.LOGGED_IN_USER_DETAIL_RESP,
//         payload   : responseData
//       });

//     })
//     .catch(e => {
//       console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
//       console.log('Error: '+e);
//       console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

//     });
//   }

// };


export const clearLoggedInUserDetailsResponse = () => ({
  type: ACTION_TYPES.CLEAR_LOGGED_IN_USER_DETAIL_RESPONSE
});


// user Authorization action
export const userAuthenticated = (text) => {
  return {
    type: ACTION_TYPES.USER_AUTHENTICATED,
    payload : text
  }
};
