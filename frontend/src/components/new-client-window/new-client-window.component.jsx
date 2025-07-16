import { useState } from "react";
import {
	NewClientWindowContainer,
	NewClientFormInput,
	ButtonsContainer,
} from "./new-client-window.styles";
import Button from "../button/button.component";
import { addClientRequest } from "../../utils/flask-backend.utils";

const defaultNewClientFields = {
	username: "",
	name: "",
	expirationDate: "",
};
const NewClientWindow = ({ closeWindow, onReloadClients }) => {
	const [newClientsFields, setNewClientsFields] = useState(
		defaultNewClientFields
	);
	const { username, name, expirationDate } = newClientsFields;

	const resetNewClientsFields = () => {
		setNewClientsFields(defaultNewClientFields);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setNewClientsFields({ ...newClientsFields, [name]: value });
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const confirmed = window.confirm(
			`El cliente siguiente sera añadido:\n\n[cliente: ${name}, usuario: ${username}, fecha de expiración: ${expirationDate}]\n\n¿Confirmar?`
		);
		if (confirmed) {
			const { success, message } = await addClientRequest(
				name,
				username,
				expirationDate
			);
			if (!success) alert(message);
		}
		resetNewClientsFields();
		closeWindow();
		onReloadClients();
	};

	const handleCancel = (e) => {
		e.preventDefault();
		resetNewClientsFields();
		closeWindow();
	};
	return (
		<NewClientWindowContainer>
			<span>Nuevo Cliente</span>
			<form onSubmit={handleSubmit}>
				<NewClientFormInput
					name="name"
					type="text"
					label="Cliente"
					required
					value={name}
					onChange={handleChange}
				/>
				<NewClientFormInput
					name="username"
					type="text"
					label="Usuario"
					required
					value={username}
					onChange={handleChange}
				/>
				<NewClientFormInput
					name="expirationDate"
					type="date"
					label="Fecha de expiración"
					required
					value={expirationDate}
					onChange={handleChange}
				/>
				<ButtonsContainer>
					<Button type="button" onClick={handleCancel}>
						Cancelar
					</Button>
					<Button type="submit">Confirmar</Button>
				</ButtonsContainer>
			</form>
		</NewClientWindowContainer>
	);
};

export default NewClientWindow;
