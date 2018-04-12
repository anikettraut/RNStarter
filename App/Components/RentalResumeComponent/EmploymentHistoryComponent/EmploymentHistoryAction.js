import ACTION_TYPES from '../../../Action/ActionsType';
import API from '../../../Constants/APIUrls';

// export const getTenantCurrentEmployment = (postData) => {

//   console.log('===========getTenantCurrentEmployment==============');
//   console.log(API.GET_TENANT_CURRENT_EMP);  
//   console.log('postdata==='+JSON.stringify(postData));
//   console.log('===============================================');  

//   var serviceHeaderResponse = {};

//   return (dispatch) => {

//     //call the API and use the promise to check the response
//     // in response callBack .then() call the dispatcher.

//     fetch(API.GET_TENANT_CURRENT_EMP, {
//       method: 'POST',
//       headers: {
//         'Accept'        : 'application/json',
//         'Content-Type'  : 'application/json',                
//       },
//       body: JSON.stringify(postData)
//     })
//     .then( (response) => {
//       console.log('*********************************************');
//       console.log('Received response getTenantCurrentEmployment API: ', response);
//       console.log('*********************************************');
//       serviceHeaderResponse = response;
//       return response.json();
//     })
//     .then( (responseJSON) => {
//       console.log('*********************************************');
//       console.log('JSON response from getTenantCurrentEmployment API: ', responseJSON);
//       console.log('*********************************************');
//       var responseData ={
//         data : responseJSON,
//         headerResponse : serviceHeaderResponse 
//       }
//       dispatch({
//         type      : ACTION_TYPES.GET_TENANT_CURRENT_EMP_ACTION,
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


// export const addUpdateTenantEmployment = (postData) => {

//   console.log('===========addUpdateTenantEmployment==============');
//   console.log(API.UPDATE_TENANT_CURRENT_EMP);  
//   console.log('postdata==='+JSON.stringify(postData));
//   console.log('===============================================');  

//   var serviceHeaderResponse = {};

//   return (dispatch) => {

//     //call the API and use the promise to check the response
//     // in response callBack .then() call the dispatcher.

//     fetch(API.UPDATE_TENANT_CURRENT_EMP, {
//       method: 'POST',
//       headers: {
//         'Accept'        : 'application/json',
//         'Content-Type'  : 'application/json',                
//       },
//       body: JSON.stringify(postData)
//     })
//     .then( (response) => {
//       console.log('*********************************************');
//       console.log('Received response addUpdateTenantEmployment API: ', response);
//       console.log('*********************************************');
//       serviceHeaderResponse = response;
//       return response.json();
//     })
//     .then( (responseJSON) => {
//       console.log('*********************************************');
//       console.log('JSON response from addUpdateTenantEmployment API: ', responseJSON);
//       console.log('*********************************************');
//       var responseData ={
//       	data : responseJSON,
//       	headerResponse : serviceHeaderResponse 
//       }
//       dispatch({
//         type      : ACTION_TYPES.UPDATE_TENANT_CURRENT_EMP_ACTION,
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

export const clearGetTenantCurrentEmploymentResponse = () => ({
  type: ACTION_TYPES.CLEAR_GET_TENANT_CURRENT_EMP_ACTION
});

export const clearAddUpdateTenantEmploymentResponse = () => ({
  type: ACTION_TYPES.CLEAR_UPDATE_TENANT_CURRENT_EMP_ACTION
});

