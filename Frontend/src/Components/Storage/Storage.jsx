const toJSON = (json) => {
	try {
		return JSON.parse(json);
	} catch (error) {
		return null;
	}
};
const toSTRING = (json) => {
	try {
		return JSON.stringify(json);
	} catch (error) {
		return null;
	}
};

export const getAccessToken = () => toJSON(localStorage.getItem('accessToken'));
export const setAccessToken = (token) => localStorage.setItem('accessToken', toSTRING(token));


export const clearSession = () => {
	localStorage.removeItem('accessToken');
	sessionStorage.clear();
	localStorage.removeItem('isLoggedIn');
};


export const setisLoggedIn = (val) => localStorage.setItem('isLoggedIn', toSTRING(val));
export const getisLoggedIn = () => toJSON(localStorage.getItem('isLoggedIn'));


