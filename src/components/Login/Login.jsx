/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginContext } from "../../context/LoginProvider";
import { Modal } from "../Modal/Modal";
import "./Login.css";

export const Login = ({ onClose }) => {
	const { isLoginOpen, isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const form = useForm();

	const onSubmit = async (values) => {
		try {
			setIsLoggedIn(true);
			onClose();
		} catch (error) {
			setError(error.response.data.message);
		}
	};
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		onSubmit,
	});

	return (
		<Modal open={isLoginOpen} onClose={onClose}>
			<div className="center">
				<section className="login">
					<h2 className="text-light">Login to save your column order!</h2>
					<div className="login login__container">
						<form onSubmit={onSubmit}>
							<input type="username" name="username" placeholder="Username" required />
							<input type="password" name="password" placeholder="Password" required />
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
