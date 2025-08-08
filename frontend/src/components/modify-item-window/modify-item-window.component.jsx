import { useContext, useState } from "react";
import {
	ModifyItemWindowContainer,
	ElementLabel,
	Selector,
	SelectLabel,
	RatingInput,
	ButtonsContainer,
} from "./modify-item-window.styles";
import { ItemsContext } from "../../context/items.context";
import { UserContext } from "../../context/user.context";
import Button from "../button/button.component";
import { modifyItem } from "../../utils/api";
const defaultModifyItemFields = {
	element: "",
	rating: "",
	classification: "",
	blocked: "true",
};
const ModifyItemWindow = ({ itemToModify, type, closeWindow }) => {
	const [modifyItemFields, setModifyItemFields] = useState(
		defaultModifyItemFields
	);
	const { rating, classification, blocked } = modifyItemFields;
	const { currentUser, logout } = useContext(UserContext);
	const username = currentUser["username"];
	const { reloadItems } = useContext(ItemsContext);

	const resetModifyItemFields = () => {
		setModifyItemFields(defaultModifyItemFields);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setModifyItemFields({ ...modifyItemFields, [name]: value });
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const modifyFields = {
			...modifyItemFields,
			element: itemToModify,
			type: type,
		};
		const confirmed = window.confirm(
			`El siguiente elemento será modificado:\n\n${itemToModify}\n\n¿Confirmar?`
		);
		if (confirmed) {
			const { success, error, code } = await modifyItem(username, modifyFields);
			if (code === 404) alert(error);
			else if (code === 401 || code === 403) {
				await logout();
			} else if (!success) {
				console.log(error);
			}
		}
		resetModifyItemFields();
		closeWindow();
		reloadItems();
	};

	const handleCancel = (e) => {
		e.preventDefault();
		resetModifyItemFields();
		closeWindow();
	};
	return (
		<ModifyItemWindowContainer>
			<span>Modificar Elemento</span>
			<form onSubmit={handleSubmit}>
				<ElementLabel>Elemento: {itemToModify}</ElementLabel>
				<SelectLabel>
					Clasificación
					<Selector
						name="classification"
						required
						value={classification}
						onChange={handleChange}>
						<option value="">Seleccione una clasificación</option>
						<option value="Malicioso">Malicioso</option>
						<option value="Sospechoso">Sospechoso</option>
						<option value="Seguro">Seguro</option>
					</Selector>
				</SelectLabel>
				<SelectLabel>
					¿Bloquear?
					<Selector
						name="blocked"
						required
						value={blocked}
						onChange={handleChange}>
						<option value="true">Si</option>
						<option value="false">No</option>
					</Selector>
				</SelectLabel>
				<RatingInput
					name="rating"
					type="number"
					label="Calificación"
					required
					value={rating}
					onChange={handleChange}
				/>
				<ButtonsContainer>
					<Button type="button" onClick={handleCancel}>
						Cancelar
					</Button>
					<Button type="submit">Confirmar</Button>
				</ButtonsContainer>
			</form>
		</ModifyItemWindowContainer>
	);
};

export default ModifyItemWindow;
