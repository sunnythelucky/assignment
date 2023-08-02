export const saveState = (state: any) => {
	localStorage.setItem("tableState", JSON.stringify(state));
};

export const loadState = () => {
	const savedState = localStorage.getItem("tableState");
	return savedState ? JSON.parse(savedState) : null;
};
