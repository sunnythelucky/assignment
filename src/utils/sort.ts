export const getDiffInDays = (date1: Date, date2: Date) => {
	const oneDay = 24 * 60 * 60 * 1000;
	return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
};
export const sortingDate = (
	rowA: { original: { registeredDate: string | number | Date } },
	rowB: { original: { registeredDate: string | number | Date } }
) => {
	const today = new Date();
	const registeredDateA = new Date(rowA.original.registeredDate);
	const registeredDateB = new Date(rowB.original.registeredDate);
	const diffDaysA = getDiffInDays(today, registeredDateA);
	const diffDaysB = getDiffInDays(today, registeredDateB);
	return diffDaysA - diffDaysB;
};
