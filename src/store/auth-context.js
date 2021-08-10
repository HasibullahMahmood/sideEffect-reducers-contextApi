import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const storageValue = localStorage.getItem('isLoggedIn');
		if (storageValue === '1') {
			setIsLoggedIn(true);
		}
	}, []);
	const loginHandler = (email, password) => {
		// We should of course check email and password
		// But it's just a dummy/ demo anyways
		setIsLoggedIn(true);
		localStorage.setItem('isLoggedIn', '1');
	};

	const logoutHandler = () => {
		setIsLoggedIn(false);
		localStorage.removeItem('isLoggedIn');
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, onLogin: loginHandler, onLogout: logoutHandler }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
