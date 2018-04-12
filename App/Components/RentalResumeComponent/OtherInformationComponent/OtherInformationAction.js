import ACTION_TYPES from '../../../Action/ActionsType';
import API from '../../../Constants/APIUrls';

// export const getTenantResidentsInfo = (postData) => {

//   console.log('===========getTenantResidentsInfo==============');
//   console.log(API.GET_TENANT_RESIDENT_INFO);  
//   console.log('postdata==='+JSON.stringify(postData));
//   console.log('===============================================');  

//   var serviceHeaderResponse = {};

//   return (dispatch) => {

//     //call the API and use the promise to check the response
//     // in response callBack .then() call the dispatcher.

//     fetch(API.GET_TENANT_RESIDENT_INFO, {
//       method: 'POST',
//       headers: {
//         'Accept'        : 'application/json',
//         'Content-Type'  : 'application/json',                
//       },
//       body: JSON.stringify(postData)
//     })
//     .then( (response) => {
//       console.log('*********************************************');
//       console.log('Received response getTenantResidentsInfo API: ', response);
//       console.log('*********************************************');
//       serviceHeaderResponse = response;
//       return response.json();
//     })
//     .then( (responseJSON) => {
//       console.log('*********************************************');
//       console.log('JSON response from getTenantResidentsInfo API: ', responseJSON);
//       console.log('*********************************************');
//       var responseData ={
//       	data : responseJSON,
//       	headerResponse : serviceHeaderResponse 
//       }
//       dispatch({
//         type      : ACTION_TYPES.GET_TENANT_RESIDENT_INFO_ACTION,
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


// export const addUpdateTenantResidentsInfo = (postData) => {

//   console.log('===========addUpdateTenantResidentsInfo==============');
//   console.log(API.UPDATE_TENANT_RESIDENT_INFO);  
//   console.log('postdata==='+JSON.stringify(postData));
//   console.log('===============================================');  

//   var serviceHeaderResponse = {};

//   return (dispatch) => {

//     //call the API and use the promise to check the response
//     // in response callBack .then() call the dispatcher.

//     fetch(API.UPDATE_TENANT_RESIDENT_INFO, {
//       method: 'POST',
//       headers: {
//         'Accept'        : 'application/json',
//         'Content-Type'  : 'application/json',                
//       },
//       body: JSON.stringify(postData)
//     })
//     .then( (response) => {
//       console.log('*********************************************');
//       console.log('Received response addUpdateTenantResidentsInfo API: ', response);
//       console.log('*********************************************');
//       serviceHeaderResponse = response;
//       return response.json();
//     })
//     .then( (responseJSON) => {
//       console.log('*********************************************');
//       console.log('JSON response from addUpdateTenantResidentsInfo API: ', responseJSON);
//       console.log('*********************************************');
//       var responseData ={
//         data : responseJSON,
//         headerResponse : serviceHeaderResponse 
//       }
//       dispatch({
//         type      : ACTION_TYPES.UPDATE_TENANT_RESIDENT_INFO_ACTION,
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

export const clearGetTenantResidentsInfoResponse = () => ({
  type: ACTION_TYPES.CLEAR_GET_TENANT_RESIDENT_INFO_ACTION
});

export const clearAddUpdateTenantResidentsInfoResponse = () => ({
  type: ACTION_TYPES.CLEAR_UPDATE_TENANT_RESIDENT_INFO_ACTION
});
