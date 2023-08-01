import { createContext, useState } from "react";

export const LoginContext = createContext({
	isLoginOpen: false,
	setIsLoginOpen: () => {},
	onClose: () => {},
	isLoggedIn: false,
	setIsLoggedIn: () => {},
});

export const LoginContextProvider = (props) => {
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const contextValue = {
		isLoginOpen,
		setIsLoginOpen,
		isLoggedIn,
		setIsLoggedIn,
	};

	return <LoginContext.Provider value={contextValue}>{props.children}</LoginContext.Provider>;
};
