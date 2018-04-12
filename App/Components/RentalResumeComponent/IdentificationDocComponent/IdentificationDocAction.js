import ACTION_TYPES from '../../../Action/ActionsType';
import API from '../../../Constants/APIUrls';

export const getTenantIdentificationDocu = (postData) => {

  console.log('===========getTenantIdentificationDocu==============');
  console.log(API.GET_TENANT_IDENT_DOCUMENT);  
  console.log('postdata==='+JSON.stringify(postData));
  console.log('===============================================');  

  var serviceHeaderResponse = {};

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(API.GET_TENANT_IDENT_DOCUMENT, {
      method: 'POST',
      headers: {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json',                
      },
      body: JSON.stringify(postData)
    })
    .then( (response) => {
      console.log('*********************************************');
      console.log('Received response getTenantIdentificationDocu API: ', response);
      console.log('*********************************************');
      serviceHeaderResponse = response;
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('*********************************************');
      console.log('JSON response from getTenantIdentificationDocu API: ', responseJSON);
      console.log('*********************************************');
      var responseData ={
        data : responseJSON,
        headerResponse : serviceHeaderResponse 
      }
      dispatch({
        type      : ACTION_TYPES.GET_TENANT_IDENT_DOCUMENT_ACTION,
        payload   : responseData
      });

    })
    .catch(e => {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      console.log('Error: '+e);
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

    });
  }

};


export const deleteIdentityDocument = (postData) => {

  console.log('===========deleteIdentityDocument==============');
  console.log(API.DELETE_TENANT_IDENT_DOCUMENT);  
  console.log('postdata==='+JSON.stringify(postData));
  console.log('===============================================');  

  var serviceHeaderResponse = {};

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(API.DELETE_TENANT_IDENT_DOCUMENT, {
      method: 'POST',
      headers: {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json',                
      },
      body: JSON.stringify(postData)
    })
    .then( (response) => {
      console.log('*********************************************');
      console.log('Received response deleteIdentityDocument API: ', response);
      console.log('*********************************************');
      serviceHeaderResponse = response;
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('*********************************************');
      console.log('JSON response from deleteIdentityDocument API: ', responseJSON);
      console.log('*********************************************');
      var responseData ={
      	data : responseJSON,
      	headerResponse : serviceHeaderResponse 
      }
      dispatch({
        type      : ACTION_TYPES.DELETE_TENANT_IDENT_DOCUMENT_ACTION,
        payload   : responseData
      });

    })
    .catch(e => {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      console.log('Error: '+e);
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

    });
  }

};


export const clearUploadMyFileDocResponse = () => ({
  type: ACTION_TYPES.CLEAR_UPLOAD_TENANT_IDENTITY_DOC_ACTION
});