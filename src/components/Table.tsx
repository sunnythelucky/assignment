import React, { useContext, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";

import { Button } from "@mui/material";

import { data } from "../api/CreateUserAPI";
import { User } from "../utils/types";
import { sortingDate } from "../utils/sort";

import { Login } from "./Login/Login";
import { LoginContext } from "../context/LoginProvider";
import LoginButton from "./Login/LoginButton";

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
	}: {
		setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
		isLoggedIn: boolean;
		setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	} = useContext(LoginContext);

	const columns = useMemo<MRT_ColumnDef<User>[]>(
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
				sortingFn: sortingDate,
			},
			{
				accessorKey: "fullName",
				header: "Full Name",
				Cell: ({ row }) => {
					return `${row.original.firstName} ${row.original.lastName}`;
				},
				sortingFn: (rowA, rowB, columnId) => {
					const fullNameA = `${rowA.original.firstName} ${rowA.original.lastName}`;
					const fullNameB = `${rowB.original.firstName} ${rowB.original.lastName}`;
					return fullNameA.localeCompare(fullNameB);
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
				sortingFn: sortingDate,
			},
		],
		[]
	);

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
						<LoginButton />
						<Button
							onClick={() => {
								table.resetColumnOrder(false);
								setISSaved(false);
							}}
							disabled={!isLoggedIn}
						>
							Reload
						</Button>
						<Button
							onClick={() => {
								setISSaved(true);
								setColumnOrder(table.getState().columnOrder);
							}}
							disabled={!isLoggedIn}
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
