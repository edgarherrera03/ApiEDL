import { useContext } from "react";
import { ClientsContainer } from "./clients.styles";
import ClientsList from "../../components/clients-list/clients-list.component";
import { ClientsContext } from "../../context/clients.context";
import Spinner from "../../components/spinner/spinner.component";

const Clients = () => {
	const { clientsList, reloadClientsList } = useContext(ClientsContext);
	if (!clientsList) return <Spinner />;

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
