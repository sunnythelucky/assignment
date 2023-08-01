import React, { useContext, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { data } from "../api/CreateUserAPI";
import { UserData } from "../types";
import { Button } from "@mui/material";
import { Login } from "./Login/Login";
import { LoginContext } from "../context/LoginProvider";
import { AsyncLocalStorage } from "async_hooks";

const Table = () => {
	const [isSaved, setISSaved] = useState(false);
	const [columnOrder, setColumnOrder] = useState([
		"firstName",
		"lastName",
		"city",
		"email",
		"registeredDate",
		"fullName",
		"dsr",
	]);

	const {
		setIsLoginOpen,
		isLoggedIn,
		setIsLoggedIn,
	}: {
		setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
		isLoggedIn: boolean;
		setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	} = useContext(LoginContext);
	const columns = useMemo<MRT_ColumnDef<UserData>[]>(
		() => [
			{
				accessorKey: "firstName",
				header: "First Name",
			},
			{
				accessorKey: "lastName",
				header: "Last Name",
			},
			{
				accessorKey: "city",
				header: "City",
			},
			{
				accessorKey: "email",
				header: "Email",
			},
			{
				accessorKey: "registeredDate",
				header: "Registered Date",
			},
			{
				accessorKey: "fullName",
				header: "Full Name",
				Cell: ({ row }) => {
					return `${row.original.firstName} ${row.original.lastName}`;
				},
			},
			{
				accessorKey: "dsr",
				header: "Days since Registered",
				Cell: ({ row }) => {
					const oneDay = 24 * 60 * 60 * 1000;
					const today = new Date();
					const registeredDate = new Date(row.original.registeredDate);
					const diffDays = Math.round(Math.abs((today.getTime() - registeredDate.getTime()) / oneDay));
					return diffDays;
				},
				sortingFn: (a, b) => (a.original.registeredDate > b.original.registeredDate ? 1 : -1),
			},
		],
		[]
	);

	const logout = () => {
		setIsLoggedIn(false);
		localStorage.removeItem("isLoggedIn");
	};

	return (
		<>
			<Login onClose={() => setIsLoginOpen(false)}></Login>
			<MaterialReactTable
				columns={columns}
				data={data}
				enableColumnOrdering={isSaved ? false : true}
				enableColumnFilters={false}
				enableRowSelection={false}
				enableExpandAll={false}
				enableGlobalFilter={false}
				enableFullScreenToggle={false}
				enableDensityToggle={false}
				enableHiding={false}
				enableColumnActions={false}
				enableSorting={true}
				renderTopToolbarCustomActions={({ table }) => (
					<>
						{isLoggedIn ? (
							<Button onClick={logout}>Logout</Button>
						) : (
							<Button onClick={() => setIsLoginOpen(true)}>Login</Button>
						)}
						<Button
							onClick={() => {
								table.resetColumnOrder(false);
								setISSaved(false);
							}}
						>
							Reset Order
						</Button>
						<Button
							onClick={() => {
								setISSaved(true);
								setColumnOrder(table.getState().columnOrder);
							}}
						>
							Save Order
						</Button>
					</>
				)}
			/>
		</>
	);
};

export default Table;
