import { useState, useEffect, useContext } from "react";
import { UsersContainer } from "./users.styles";
import { requestUsersInformation, deleteUserRequest } from "../../utils/api";
import UsersList from "../../components/users-list/users-list.component";
import { UserContext } from "../../context/user.context";

const Users = () => {
	const [usersInfo, setUsersInfo] = useState([]);
	const [toggleOpenModal, setToggleOpenModal] = useState(false);
	const { currentUser, logout } = useContext(UserContext);
	const handleOpenModal = () => {
		setToggleOpenModal(true);
	};

	const handleCloseModal = () => {
		setToggleOpenModal(false);
	};

	useEffect(() => {
		const fetchUsers = async () => {
			const { success, users, code, error } = await requestUsersInformation();
			if (success) {
				setUsersInfo(users);
			} else if (code === 401 || code === 403) {
				await logout();
			} else {
				console.log(error);
			}
		};

		fetchUsers();
	}, [logout]);

	const handleDelete = async (usernameToDelete) => {
		const confirmed = window.confirm(
			`¿Estás seguro que que quieres eliminar el usuario de ${usernameToDelete} ?`
		);
		if (confirmed) {
			const { success, error, code } = await deleteUserRequest(
				currentUser["username"],
				usernameToDelete
			);
			if (success) {
				setUsersInfo((prevUsers) =>
					prevUsers.filter((user) => user.username !== usernameToDelete)
				);
			} else if (code === 401 || code === 403) {
				await logout();
			} else if (code === 409) {
				alert(error);
			} else {
				console.log(error);
			}
		}
	};

	const handleUsersReload = async () => {
		const { success, users, code, error } = await requestUsersInformation();
		if (success) {
			setUsersInfo(users);
		} else if (code === 401 || code === 403) {
			await logout();
		} else {
			console.log(error);
		}
	};

	return (
		<>
			<UsersContainer>
				<UsersList
					usersInfo={usersInfo}
					onDelete={handleDelete}
					openModal={toggleOpenModal}
					onCloseModal={handleCloseModal}
					onOpenModal={handleOpenModal}
					reloadUserList={handleUsersReload}
				/>
			</UsersContainer>
		</>
	);
};

export default Users;
