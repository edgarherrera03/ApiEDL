import { createContext, useState, useEffect, useContext } from "react";
import { requestClientsList } from "../utils/api";
import { UserContext } from "./user.context";

export const ClientsContext = createContext({
	clientsList: [],
	setClientsList: () => null,
	reloadClientsList: () => null,
});

export const ClientsProvider = ({ children }) => {
	const [clientsList, setClientsList] = useState([]);
	const { logout, isAuthenticated } = useContext(UserContext);

	useEffect(() => {
		if (!isAuthenticated) return;

		const fetchClients = async () => {
			const { success, error, code, clients } = await requestClientsList();
			if (success) {
				setClientsList(clients);
			} else if (code === 404) {
				console.log(error);
			} else if (code === 403 || code === 401) {
				await logout();
			}
		};
		fetchClients();
	}, [isAuthenticated, logout]);

	const reloadClientsList = async () => {
		const { success, code, clients, error } = await requestClientsList();
		if (success) {
			setClientsList(clients);
		} else if (code === 404) {
			console.log(error);
		} else if (code === 403 || code === 401) {
			await logout();
		}
	};

	const value = {
		clientsList,
		setClientsList,
		reloadClientsList,
	};

	return (
		<ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>
	);
};
