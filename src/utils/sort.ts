export const sortingDate = (
	rowA: { original: { registeredDate: string | number | Date } },
	rowB: { original: { registeredDate: string | number | Date } }
) => {
	const oneDay = 24 * 60 * 60 * 1000;
	const today = new Date();
	const registeredDateA = new Date(rowA.original.registeredDate);
	const registeredDateB = new Date(rowB.original.registeredDate);
	const diffDaysA = Math.round(Math.abs((today.getTime() - registeredDateA.getTime()) / oneDay));
	const diffDaysB = Math.round(Math.abs((today.getTime() - registeredDateB.getTime()) / oneDay));
	return diffDaysA - diffDaysB;
};
