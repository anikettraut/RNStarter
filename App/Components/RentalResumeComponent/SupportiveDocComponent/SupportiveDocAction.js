import ACTION_TYPES from '../../../Action/ActionsType';
import API from '../../../Constants/APIUrls';

export const getTenantSupportingDocu = (postData) => {

  console.log('===========getTenantSupportingDocu==============');
  console.log(API.GET_TENANT_SUPPORT_DOCUMENT);  
  console.log('postdata==='+JSON.stringify(postData));
  console.log('===============================================');  

  var serviceHeaderResponse = {};

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(API.GET_TENANT_SUPPORT_DOCUMENT, {
      method: 'POST',
      headers: {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json',                
      },
      body: JSON.stringify(postData)
    })
    .then( (response) => {
      console.log('*********************************************');
      console.log('Received response getTenantSupportingDocu API: ', response);
      console.log('*********************************************');
      serviceHeaderResponse = response;
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('*********************************************');
      console.log('JSON response from getTenantSupportingDocu API: ', responseJSON);
      console.log('*********************************************');
      var responseData ={
      	data : responseJSON,
      	headerResponse : serviceHeaderResponse 
      }
      dispatch({
        type      : ACTION_TYPES.GET_TENANT_SUPPORT_DOCUMENT_ACTION,
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

