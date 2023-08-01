export type User = {
	firstName: string;
	lastName: string;
	email: string;
	id: string;
	city: string;
	registeredDate: string;
};

export interface UserData extends User {
	fullName?: string;
	dsr?: string;
}
