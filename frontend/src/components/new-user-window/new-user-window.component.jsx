import { useState } from "react";
import Button from "../button/button.component";
import {
	NewUserContainer,
	ButtonsContainer,
	RoleSelector,
	RoleLabel,
	NewUserFormInput,
	ErrorMessage,
} from "./new-user-window.styles";
import { addUserRequest } from "../../utils/api";

const defaultNewUserFields = {
	username: "",
	role: "",
	password: "",
	confirmPassword: "",
};

const NewUserWindow = ({ closeWindow, onReloadUsers }) => {
	const [newUserFields, setNewUserFields] = useState(defaultNewUserFields);
	const [messageLabel, setMessageLabel] = useState("");
	const { username, role, password, confirmPassword } = newUserFields;

	const resetNewUserFields = () => {
		setNewUserFields(defaultNewUserFields);
		setMessageLabel("");
	};

	const getPasswordValidationStatus = (password) => ({
		hasLowercase: /[a-z]/.test(password),
		hasUppercase: /[A-Z]/.test(password),
		hasNumber: /[0-9]/.test(password),
		hasSpecialChar: /[^A-Za-z0-9]/.test(password),
		hasMinLength: password.length >= 8,
	});

	const getValidationErrorMessage = (status) => {
		for (const key of Object.keys(status)) {
			if (!status[key]) {
				switch (key) {
					case "hasLowercase":
						return "Falta una minúscula";
					case "hasUppercase":
						return "Falta una mayúscula";
					case "hasNumber":
						return "Falta un número";
					case "hasSpecialChar":
						return "Falta un caracter especial";
					case "hasMinLength":
						return "Al menos 8 caracteres";
					default:
						return "";
				}
			}
		}
		return "";
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setNewUserFields({ ...newUserFields, [name]: value });
	};
	const handleSubmit = async (event) => {
		event.preventDefault();

		const validationStatus = getPasswordValidationStatus(password);
		const errorMessage = getValidationErrorMessage(validationStatus);
		setMessageLabel(errorMessage);
		if (errorMessage) {
			return;
		}
		if (password !== confirmPassword) {
			setMessageLabel("Las contraseñas no coinciden");
			return;
		}

		setMessageLabel("");

		const confirmed = window.confirm(
			`El siguiente usuario se añadirá a la base de datos:\n\n[usuario: ${username}, rol: ${role}]\n\n¿Confirmar?`
		);
		if (confirmed) {
			const { success, message } = await addUserRequest(
				username,
				password,
				role
			);
			if (!success) alert(message);
		}
		resetNewUserFields();
		closeWindow();
		onReloadUsers();
	};

	const handleCancel = (e) => {
		e.preventDefault();
		resetNewUserFields();
		closeWindow();
	};

	return (
		<NewUserContainer>
			<span>Añadir un nuevo usuario</span>
			<form onSubmit={handleSubmit}>
				<NewUserFormInput
					name="username"
					type="text"
					label="Usuario"
					required
					value={username}
					onChange={handleChange}
				/>
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
				<NewUserFormInput
					name="confirmPassword"
					type="password"
					label="Confirmar contraseña"
					required
					value={confirmPassword}
					onChange={handleChange}
				/>
				{messageLabel && <ErrorMessage>{messageLabel}</ErrorMessage>}
				<ButtonsContainer>
					<Button type="button" onClick={handleCancel}>
						Cancelar
					</Button>
					<Button type="submit">Confirmar</Button>
				</ButtonsContainer>
			</form>
		</NewUserContainer>
	);
};

export default NewUserWindow;
