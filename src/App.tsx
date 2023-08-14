import "./App.css";
import Table from "./components/Table/Table";
import { TableContainer } from "./components/Table/Table.styled";
import { LoginContextProvider } from "./context/LoginProvider";

function App() {
	return (
		<div className="App">
			<LoginContextProvider>
				<TableContainer>
					<Table />
				</TableContainer>
			</LoginContextProvider>
		</div>
	);
}

export default App;
