import { ClientsListContainer } from "./clients-list.styles";
import Button from "../button/button.component";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { UserContext } from "../../context/user.context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import InfoList from "../info-list/info-list.component";
import NewClientWindow from "../new-client-window/new-client-window.component";

const headerTitles = [
	"ID",
	"Cliente",
	"Usuario",
	"Fecha de expiración",
	"Fecha de creación",
	"Fecha de actualización",
	"Acciones",
];

const orderedKeys = [
	"id",
	"name",
	"username",
	"creationDate",
	"updateDate",
	"expirationDate",
	"actions",
];

const ClientsList = ({ clientsList, reloadClientsList }) => {
	const [openNewClientWindow, setOpenNewClientWindow] = useState(false);
	const { currentUser } = useContext(UserContext);
	const role = currentUser["role"];
	const navigate = useNavigate();

	const openNewClient = () => {
		setOpenNewClientWindow(true);
	};
	const closeNewClient = () => {
		setOpenNewClientWindow(false);
	};

	const renderClientActions = (client) => (
		<Button
			onClick={() => navigate(`/clientes/${client.clientToken}`)}
			type="button"
			buttonType={BUTTON_TYPE_CLASSES.modify}>
			Ver
		</Button>
	);
	return (
		<>
			<ClientsListContainer $activated={openNewClientWindow}>
				{role === "admin" && (
					<Button
						onClick={openNewClient}
						type="button"
						buttonType={BUTTON_TYPE_CLASSES.add}>
						Nuevo Cliente
					</Button>
				)}
				<InfoList
					headerTitleList={headerTitles}
					infoList={clientsList}
					orderedKeys={orderedKeys}
					renderActions={renderClientActions}
					activated={openNewClientWindow}
				/>
			</ClientsListContainer>
			{openNewClientWindow && (
				<NewClientWindow
					closeWindow={closeNewClient}
					onReloadClients={reloadClientsList}
				/>
			)}
		</>
	);
};

export default ClientsList;
