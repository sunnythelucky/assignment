import { faker } from "@faker-js/faker";
import { User } from "../utils/types";

const createUser = (): User => {
	const firstName = faker.person.firstName();
	const lastName = faker.person.lastName();
	const city = faker.location.city();
	const registeredDate = faker.date.past();
	return {
		firstName: firstName,
		lastName: lastName,
		id: faker.internet.userName({ firstName, lastName }),
		email: faker.internet.email({ firstName, lastName }),
		city: city,
		registeredDate: new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		}).format(registeredDate),
	};
};

export const createUserData = () => {
	const data = faker.helpers.multiple(createUser, { count: 500 });
	localStorage.setItem("users", JSON.stringify(data));
};

export const loadUserData = () => {
	const savedData = localStorage.getItem("users");
	return savedData ? JSON.parse(savedData) : null;
};
