import {
	UserInformationContainer,
	ChangePasswordContainer,
	UserInformation,
	ChangePasswordInput,
	PasswordRequirementsContainer,
	PasswordRequirement,
	ChangePassword,
	InfoInput,
} from "./user-info.styles";
import { useContext, useState } from "react";
import Button from "../button/button.component";
import { UserContext } from "../../context/user.context";
import { changePasswordRequest } from "../../utils/api";

const defaultChangePasswordFields = {
	password: "",
	confirmPassword: "",
};
const UserInfo = ({ openModal }) => {
	const [changePasswordFields, setChangePasswordFields] = useState(
		defaultChangePasswordFields
	);
	const { password, confirmPassword } = changePasswordFields;
	const { currentUser, logout } = useContext(UserContext);
	const { username, role } = currentUser;

	const getPasswordValidationStatus = (password) => {
		return {
			hasLowercase: /[a-z]/.test(password),
			hasUppercase: /[A-Z]/.test(password),
			hasNumber: /[0-9]/.test(password),
			hasSpecialChar: /[^A-Za-z0-9]/.test(password),
			hasMinLength: password.length >= 8,
		};
	};

	const validatePassword = (password) => {
		const hasLowercase = /[a-z]/.test(password);
		const hasUppercase = /[A-Z]/.test(password);
		const hasNumber = /[0-9]/.test(password);
		const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
		const hasMinLength = password.length >= 8;

		return (
			hasLowercase &&
			hasUppercase &&
			hasNumber &&
			hasSpecialChar &&
			hasMinLength
		);
	};
	const validationStatus = getPasswordValidationStatus(password);

	const resetChangePasswordFields = () => {
		setChangePasswordFields(defaultChangePasswordFields);
	};
	const handleChange = (event) => {
		const { name, value } = event.target;
		setChangePasswordFields({ ...changePasswordFields, [name]: value });
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const { password, confirmPassword } = changePasswordFields;
		if (validatePassword(password) && password === confirmPassword) {
			const confirmed = window.confirm(
				"¿Estás seguro que deseas cambiar la contraseña?"
			);
			if (confirmed) {
				const { success, error, code } = await changePasswordRequest(
					username,
					password
				);
				if (code === 401 || code === 403) {
					await logout();
				} else if (!success) {
					alert(error);
				}
			}
		} else {
			alert(
				"Las contraseñas no coinciden o no responden a todos los requisitos."
			);
		}

		resetChangePasswordFields();
	};
	return (
		<UserInformationContainer $activated={openModal}>
			<ChangePassword>
				<ChangePasswordContainer>
					<h3>Cambio de constraseña</h3>
					<form onSubmit={handleSubmit}>
						<ChangePasswordInput
							name="password"
							type="password"
							label="Nueva contraseña"
							required
							value={password}
							onChange={handleChange}
						/>
						<ChangePasswordInput
							name="confirmPassword"
							type="password"
							label="Confirmar contraseña"
							required
							value={confirmPassword}
							onChange={handleChange}
						/>
						<Button type="submit">Confirmar</Button>
					</form>
				</ChangePasswordContainer>
				<PasswordRequirementsContainer>
					<h4>Requisitos de la contraseña:</h4>
					<ul>
						<PasswordRequirement
							$validationStatus={validationStatus.hasLowercase}>
							Al menos una minúscula
						</PasswordRequirement>
						<PasswordRequirement
							$validationStatus={validationStatus.hasUppercase}>
							Al menos una mayúscula
						</PasswordRequirement>
						<PasswordRequirement $validationStatus={validationStatus.hasNumber}>
							Al menos un número
						</PasswordRequirement>
						<PasswordRequirement
							$validationStatus={validationStatus.hasSpecialChar}>
							Al menos un caracter especial
						</PasswordRequirement>
						<PasswordRequirement
							$validationStatus={validationStatus.hasMinLength}>
							Al menos 8 caracteres
						</PasswordRequirement>
					</ul>
				</PasswordRequirementsContainer>
			</ChangePassword>
			<UserInformation>
				<h3>Información del usuario</h3>
				<div>
					<InfoInput
						type="text"
						label="Nombre de Usuario"
						value={username}
						readOnly
					/>
					<InfoInput type="text" label="Rol" value={role} readOnly />
				</div>
			</UserInformation>
		</UserInformationContainer>
	);
};

export default UserInfo;
