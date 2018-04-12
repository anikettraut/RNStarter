import Moment from 'moment';

const validateEmail = (email) => {
	var re = /^(([^<>()\[\]\\,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		 return re.test(email);
};

const validateMobileNumber = (number) => {
	var re = /(0[0-9]{9})/;
		 return re.test(number);
};


const formatDreamDate = (commentDate) => {

        var formattedDate = '';
        return formattedDate;
        
};

export { validateEmail, validateMobileNumber};