import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Login } from "../../components/Login/Login";
import LoginButton from "../../components/Login/LoginButton";

it("renders without crashing", () => {
	const div = document.createElement("div");
	const root = createRoot(div);
	root.render(<Login />);
});

it("renders login button correctly", () => {
	const div = document.createElement("div");
	const root = createRoot(div);
	root.render(<LoginButton />);
});
