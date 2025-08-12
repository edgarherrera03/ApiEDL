import { useContext } from "react";
import { ClientsContainer } from "./clients.styles";
import ClientsList from "../../components/clients-list/clients-list.component";
import { ClientsContext } from "../../context/clients.context";

const Clients = () => {
	const { clientsList, reloadClientsList } = useContext(ClientsContext);

	return (
		<ClientsContainer>
			<ClientsList
				clientsList={clientsList}
				reloadClientsList={reloadClientsList}
			/>
		</ClientsContainer>
	);
};
export default Clients;
