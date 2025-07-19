import { useContext, useState } from "react";
import Button from "../button/button.component";
import {
	ModifyWindowContainer,
	ButtonsContainer,
	RoleSelector,
	RoleLabel,
	NewUserFormInput,
	UserLabel,
} from "./modify-window.styles";
import { modifyUserRequest } from "../../utils/api";
import { UserContext } from "../../context/user.context";

const defaultModifyFields = {
	role: "",
	password: "",
};

const ModifyWindow = ({ closeWindow, onReloadUsers, usernameToModify }) => {
	const [modifyFields, setModifyFields] = useState(defaultModifyFields);
	const { role, password } = modifyFields;
	const { currentUser } = useContext(UserContext);
	const username = currentUser["username"];

	const resetModifyFields = () => {
		setModifyFields(defaultModifyFields);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setModifyFields({ ...modifyFields, [name]: value });
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const confirmed = window.confirm(
			`Los accesos del siguiente usuario serán modificados:\n\n[usuario: ${usernameToModify}, rol: ${role}]\n\n¿Confirmar?`
		);
		if (confirmed) {
			const { success, message } = await modifyUserRequest(
				username,
				password,
				usernameToModify,
				role
			);
			if (!success) alert(message);
		}
		resetModifyFields();
		closeWindow();
		onReloadUsers();
	};

	const handleCancel = (e) => {
		e.preventDefault();
		resetModifyFields();
		closeWindow();
	};

	return (
		<ModifyWindowContainer>
			<span>Modificar los accesos</span>
			<form onSubmit={handleSubmit}>
				<UserLabel>Usuario: {usernameToModify}</UserLabel>
				<RoleLabel>
					Rol
					<RoleSelector
						name="role"
						required
						value={role}
						onChange={handleChange}>
						<option value="">Seleccione un rol</option>
						<option value="admin">Admin</option>
						<option value="reader">Reader</option>
					</RoleSelector>
				</RoleLabel>
				<NewUserFormInput
					name="password"
					type="password"
					label="Contraseña"
					required
					value={password}
					onChange={handleChange}
				/>
				<ButtonsContainer>
					<Button type="button" onClick={handleCancel}>
						Cancelar
					</Button>
					<Button type="submit">Confirmar</Button>
				</ButtonsContainer>
			</form>
		</ModifyWindowContainer>
	);
};

export default ModifyWindow;
