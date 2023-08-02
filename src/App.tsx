import "./App.css";
import Table from "./components/Table/Table";
import { LoginContextProvider } from "./context/LoginProvider";

function App() {
	return (
		<div className="App">
			<LoginContextProvider>
				<Table />
			</LoginContextProvider>
		</div>
	);
}

export default App;
