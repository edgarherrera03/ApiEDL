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
			const response = await requestClientsList();
			if (response.success) {
				setClientslist(response.clients);
			} else if (response.code === 404) {
				console.log(response.error || "No se encontro ningun cliente");
			} else if (response.code === 403 || response.code === 401) {
				await logout();
			}
		};

		fetchClients();
	}, [logout]);
	const reloadClientsList = async () => {
		const response = await requestClientsList();
		if (response.success) {
			setClientslist(response.clients);
		} else if (response.code === 404) {
			console.log(response.error || "No se encontro ningun cliente");
		} else if (response.code === 403 || response.code === 401) {
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
