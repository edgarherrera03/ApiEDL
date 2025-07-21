import { useEffect, useState } from "react";
import { requestClientsList } from "../../utils/api";
import { ClientsContainer } from "./clients.styles";
import ClientsList from "../../components/clients-list/clients-list.component";

const Clients = () => {
	const [clientslist, setClientslist] = useState([]);
	useEffect(() => {
		const fetchClients = async () => {
			const response = await requestClientsList();
			if (response.success) {
				setClientslist(response.clients);
			} else {
				console.log(response.error || "Error fetching clients information");
			}
		};

		fetchClients();
	}, []);
	const reloadClientsList = async () => {
		const response = await requestClientsList();
		if (response.success) {
			setClientslist(response.clients);
		} else {
			console.log(response.error || "Error reloading clients list");
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
