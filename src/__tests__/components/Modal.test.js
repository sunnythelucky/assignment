import React from "react";
import { createRoot } from "react-dom/client";
import { Modal } from "../../components/Modal/Modal";

it("renders without crashing", () => {
	const div = document.createElement("div");
	const root = createRoot(div);
	root.render(<Modal />);
});
