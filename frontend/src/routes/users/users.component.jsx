import { useState, useEffect, useContext } from "react";
import { UsersContainer } from "./users.styles";
import { requestUsersInformation, deleteUserRequest } from "../../utils/api";
import UsersList from "../../components/users-list/users-list.component";
import { UserContext } from "../../context/user.context";

const Users = () => {
	const [usersInfo, setUsersInfo] = useState([]);
	const [toggleOpenModal, setToggleOpenModal] = useState(false);
	const { currentUser } = useContext(UserContext);
	const handleOpenModal = () => {
		setToggleOpenModal(true);
	};

	const handleCloseModal = () => {
		setToggleOpenModal(false);
	};

	useEffect(() => {
		const fetchUsers = async () => {
			const response = await requestUsersInformation();
			if (response.success) {
				setUsersInfo(response.users);
			} else {
				console.log(response.error || "Error fetching users information");
			}
		};

		fetchUsers();
	}, []);

	const handleDelete = async (usernameToDelete) => {
		const confirmed = window.confirm(
			`¿Estás seguro que que quieres eliminar el usuario de ${usernameToDelete} ?`
		);
		if (confirmed) {
			const { success, message } = await deleteUserRequest(
				currentUser["username"],
				usernameToDelete
			);
			if (success) {
				setUsersInfo((prevUsers) =>
					prevUsers.filter((user) => user.username !== usernameToDelete)
				);
			} else {
				console.log(message);
			}
		}
	};

	const handleUsersReload = async () => {
		const { success, users } = await requestUsersInformation();
		if (success) {
			setUsersInfo(users);
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
