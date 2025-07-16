import { useState, useEffect } from "react";
import { UsersContainer } from "./users.styles";
import {
	requestUsersInformation,
	deleteUserRequest,
} from "../../utils/flask-backend.utils";
import UsersList from "../../components/users-list/users-list.component";
import UserInfo from "../../components/user-info/user-info.component";

const Users = () => {
	const [usersInfo, setUsersInfo] = useState([]);
	const [toggleOpenModal, setToggleOpenModal] = useState(false);

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
				alert(response.error || "Error fetching users information");
			}
		};

		fetchUsers();
	}, []);

	const handleDelete = async (username) => {
		const confirmed = window.confirm(
			`¿Estás seguro que que quieres eliminar el usuario de ${username} ?`
		);
		if (confirmed) {
			const { success, message } = await deleteUserRequest(username);
			if (success) {
				setUsersInfo((prevUsers) =>
					prevUsers.filter((user) => user.username !== username)
				);
			} else {
				alert(message);
			}
		}
	};

	const handleUsersReload = async () => {
		const data = await requestUsersInformation();
		if (data) {
			setUsersInfo(data);
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
				<UserInfo openModal={toggleOpenModal} />
			</UsersContainer>
		</>
	);
};

export default Users;
