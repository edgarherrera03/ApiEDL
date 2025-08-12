import { ClientsListContainer, TitleContainer } from "./clients-list.styles";
import Button from "../button/button.component";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { UserContext } from "../../context/user.context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import InfoList from "../info-list/info-list.component";
import NewClientWindow from "../new-client-window/new-client-window.component";
import { deleteClientRequest } from "../../utils/api";

const headerTitles = [
	"ID",
	"Cliente",
	"Usuario",
	"Fecha de creación",
	"Fecha de actualización",
	"Fecha de expiración",
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
	const { currentUser, logout } = useContext(UserContext);
	const role = currentUser["role"];
	const navigate = useNavigate();

	const openNewClient = () => {
		setOpenNewClientWindow(true);
	};
	const closeNewClient = () => {
		setOpenNewClientWindow(false);
	};

	const onDelete = async (usernameToDelete) => {
		const confirmed = window.confirm(
			`El siguiente cliente sera elminado: ${usernameToDelete}\n\n Nota: todos los elementos e información atribuida a ese cliente serán eliminados.\n\n¿Confirmar?`
		);
		if (!confirmed) return;
		const { success, error, code } = await deleteClientRequest(
			currentUser.username,
			usernameToDelete
		);
		if (code === 401 || code === 403) {
			await logout();
		} else if (code === 404) {
			alert(error);
		} else if (!success) {
			console.log(error);
		}
		reloadClientsList();
	};

	const renderClientActions = (client) => (
		<>
			<Button
				onClick={() => navigate(`/clientes/${client.clientToken}`)}
				type="button"
				buttonType={BUTTON_TYPE_CLASSES.modify}>
				Ver
			</Button>
			{role === "admin" && (
				<Button
					buttonType={BUTTON_TYPE_CLASSES.delete}
					onClick={() => onDelete(client.username)}>
					Delete
				</Button>
			)}
		</>
	);
	return (
		<>
			<ClientsListContainer $activated={openNewClientWindow}>
				<TitleContainer>
					<h1>Lista de Clientes</h1>
				</TitleContainer>
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
