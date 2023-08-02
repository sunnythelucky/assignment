/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useSignIn } from "react-auth-kit";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { useForm } from "react-hook-form";
import { LoginContext } from "../../context/LoginProvider";
import { Modal } from "../Modal/Modal";
import "./Login.css";

export const Login = ({ onClose }) => {
	const { isLoginOpen, isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const signIn = useSignIn();

	const form = useForm();

	const onSubmit = async (values) => {
		console.log("Values: ", values);
		setError("");

		try {
			const response = await axios.post("http://localhost:9000/api/v1/login", values);

			signIn({
				token: response.data.token,
				expiresIn: 3600,
				tokenType: "Bearer",
				authState: { username: values.username },
			});
		} catch (err) {
			if (err && err instanceof AxiosError) setError(err.response?.data.message);
			else if (err && err instanceof Error) setError(err.message);

			console.log("Error: ", err);
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
						<form onSubmit={formik.handleSubmit}>
							<input type="username" name="username" placeholder="Username" required value={formik.values.username} />
							<input type="text" name="password" placeholder="Password" required value={formik.values.password} />
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
