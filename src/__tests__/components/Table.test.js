import React from "react";
import { createRoot } from "react-dom/client";
import Table from "../../components/Table/Table";

it("renders without crashing", () => {
	const div = document.createElement("div");
	const root = createRoot(div);
	root.render(<Table />);
});
