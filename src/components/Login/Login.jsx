/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { LoginContext } from "../../context/LoginProvider";
import { Modal } from "../Modal/Modal";
import "./Login.css";

export const Login = ({ onClose }) => {
	const { isLoginOpen, isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

	const form = useForm();

	const login = (event) => {
		event.preventDefault();
		setIsLoggedIn(true);
		localStorage.setItem("isLoggedIn", true);
		event.target.reset();
	};

	return (
		<Modal open={isLoginOpen} onClose={onClose}>
			<div className="center">
				<section className="login">
					<h2 className="text-light">Login to save your column order!</h2>
					<div className="login login__container">
						<form ref={form} onSubmit={login}>
							<input type="email" name="email" placeholder="Email" required />
							<input type="text" name="password" placeholder="Password" required />
							<button type="submit" className="btn btn-primary">
								Login
							</button>
						</form>
					</div>
				</section>
			</div>
		</Modal>
	);
};
