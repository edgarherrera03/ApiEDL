import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import Button from "../button/button.component";
import NewUserWindow from "../new-user-window/new-user-window.component";
import ModifyWindow from "../modify-window/modify-window.component";
import { useContext, useState } from "react";
import {
	UsersListContainer,
	UsersInformationContainer,
} from "./users-list.styles";
import { UserContext } from "../../context/user.context";
import InfoList from "../info-list/info-list.component";

const headerTitles = ["Usuario", "Rol", "Acciones"];
const orderedKeys = ["username", "role", "actions"];

const UsersList = ({
	openModal,
	usersInfo,
	onDelete,
	onCloseModal,
	onOpenModal,
	reloadUserList,
}) => {
	const { currentUser } = useContext(UserContext);
	const role = currentUser["role"];
	const [openNewUsr, setOpenNewUsr] = useState(false);
	const [userToModify, setUserToModify] = useState(null);
	const handleOpenNewUser = () => {
		onOpenModal();
		setOpenNewUsr(true);
	};

	const handleCloseNewUsr = () => {
		onCloseModal();
		setOpenNewUsr(false);
	};
	const handleOpenModifyUser = (username) => {
		setUserToModify(username);
		onOpenModal();
	};

	const handleCloseModifyUser = () => {
		setUserToModify(null);
		onCloseModal();
	};

	const renderUserActions = (user) =>
		role === "admin" && (
			<>
				<Button
					buttonType={BUTTON_TYPE_CLASSES.delete}
					onClick={() => onDelete(user.username)}>
					Delete
				</Button>
				<Button
					onClick={() => handleOpenModifyUser(user.username)}
					buttonType={BUTTON_TYPE_CLASSES.modify}>
					Modificar
				</Button>
			</>
		);
	return (
		<UsersListContainer $activated={openModal}>
			<h1>Lista de usuarios</h1>
			<UsersInformationContainer $activated={openModal}>
				{role === "admin" && (
					<Button
						onClick={handleOpenNewUser}
						buttonType={BUTTON_TYPE_CLASSES.add}>
						Añadir usuario
					</Button>
				)}
				<InfoList
					headerTitleList={headerTitles}
					infoList={usersInfo}
					orderedKeys={orderedKeys}
					renderActions={renderUserActions}
					activated={openModal}
				/>
			</UsersInformationContainer>

			{openNewUsr && (
				<NewUserWindow
					closeWindow={handleCloseNewUsr}
					onReloadUsers={reloadUserList}
				/>
			)}
			{userToModify && (
				<ModifyWindow
					closeWindow={handleCloseModifyUser}
					onReloadUsers={reloadUserList}
					usernameToModify={userToModify}
				/>
			)}
		</UsersListContainer>
	);
};

export default UsersList;
