import React, { useContext } from "react";
import { Button } from "@mui/material";
import { LoginContext } from "../../context/LoginProvider";

const logout = () => {};

const LoginButton = () => {
	const {
		setIsLoginOpen,
		isLoggedIn,
	}: {
		setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
		isLoggedIn: boolean;
		setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	} = useContext(LoginContext);

	return isLoggedIn ? (
		<Button onClick={logout}>Logout</Button>
	) : (
		<Button onClick={() => setIsLoginOpen(true)}>Login</Button>
	);
};

export default LoginButton;
