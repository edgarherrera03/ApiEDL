import { useContext, useEffect, useState } from "react";
import { requestClientsList } from "../../utils/api";
import { ClientsContainer } from "./clients.styles";
import ClientsList from "../../components/clients-list/clients-list.component";
import { UserContext } from "../../context/user.context";

const Clients = () => {
	const { logout } = useContext(UserContext);
	const [clientslist, setClientslist] = useState([]);
	useEffect(() => {
		const fetchClients = async () => {
			const { success, code, clients, error } = await requestClientsList();
			if (success) {
				setClientslist(clients);
			} else if (code === 404) {
				console.log(error);
			} else if (code === 403 || code === 401) {
				await logout();
			}
		};

		fetchClients();
	}, [logout]);
	const reloadClientsList = async () => {
		const { success, code, clients, error } = await requestClientsList();
		if (success) {
			setClientslist(clients);
		} else if (code === 404) {
			console.log(error);
		} else if (code === 403 || code === 401) {
			await logout();
		}
	};
	return (
		<ClientsContainer>
			<ClientsList
				clientsList={clientslist}
				reloadClientsList={reloadClientsList}
			/>
		</ClientsContainer>
	);
};
export default Clients;
