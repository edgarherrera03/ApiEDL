import { useContext, useEffect, useState } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
	RegisterItemTabContainer,
	RegisterItemTabTitle,
	RegisterItemContent,
	SelectFilter,
	ButtonContainer,
	InputLabel,
	Selector,
	Option,
	Input,
} from "./register-item-tab.styles";
import { addCommentToItem, registerItem } from "../../utils/api";
import { UserContext } from "../../context/user.context";
import { ItemsContext } from "../../context/items.context";

const defaultRegisterValues = {
	element: "",
	type: "",
	clients: [],
	classification: "",
	country: "",
	blocked: "true",
	rating: "",
	comment: "",
};

const RegisterItemTab = ({ clientsList, investigateResult }) => {
	const [registerValues, setRegisterValues] = useState(defaultRegisterValues);
	const { currentUser, logout } = useContext(UserContext);
	const { reloadItems } = useContext(ItemsContext);
	const {
		element,
		type,
		rating,
		clients,
		classification,
		country,
		blocked,
		comment,
	} = registerValues;

	useEffect(() => {
		if (investigateResult) {
			setRegisterValues({ ...registerValues, ...investigateResult });
		}
	}, [investigateResult]);

	const handleSelectChange = (name) => (selectedOption) => {
		setRegisterValues({ ...registerValues, [name]: selectedOption });
	};
	const handleChangeText = (event) => {
		const { name, value } = event.target;
		setRegisterValues({ ...registerValues, [name]: value });
	};

	const handleRegister = async (event) => {
		event.preventDefault();
		const clientValues = clients.map((t) => t.value);
		const { comment, ...filteredValues } = registerValues;

		const itemToAdd = { ...filteredValues, clients: clientValues };
		const confirmed = window.confirm(
			`El siguiente elemento sera añadido:\n\n ${itemToAdd.element}\n\n¿Confirmar?`
		);
		if (!confirmed) return;
		const { success, error, code } = await registerItem(
			currentUser["username"],
			itemToAdd
		);
		if (code === 403 || code === 401) {
			await logout();
		} else if (code === 409) {
			alert(error);
		} else if (!success) {
			console.log(error);
		}
		if (comment) {
			await addCommentToItem(
				currentUser["username"],
				itemToAdd["type"],
				comment,
				itemToAdd["element"]
			);
		}
		reloadItems();
		setRegisterValues(defaultRegisterValues);
	};
	return (
		<RegisterItemTabContainer>
			<RegisterItemTabTitle>
				<h1>Registrar</h1>
			</RegisterItemTabTitle>
			<RegisterItemContent>
				<span>Nuevo Registro</span>
				<form onSubmit={handleRegister}>
					<Option>
						<InputLabel>
							IP, Dominio o Hash
							<Input
								name="element"
								type="text"
								value={element}
								onChange={handleChangeText}
								required
							/>
						</InputLabel>
						<InputLabel>
							Tipo
							<Selector
								name="type"
								required
								value={type}
								onChange={handleChangeText}>
								<option value="">Seleccione un tipo</option>
								<option value="ip">IP</option>
								<option value="domain">Dominio</option>
								<option value="hash">Hash</option>
							</Selector>
						</InputLabel>
					</Option>

					<SelectFilter
						name="clients"
						isMulti
						options={clientsList}
						value={clients}
						onChange={handleSelectChange("clients")}
						placeholder="Seleccionar cliente(s)..."
						isSearchable
						required
					/>
					<Option>
						<InputLabel>
							Clasificación
							<Selector
								name="classification"
								required
								value={classification}
								onChange={handleChangeText}>
								<option value="">Seleccione una Clasificación</option>
								<option value="Malicioso">Malicioso</option>
								<option value="Seguro">Seguro</option>
								<option value="Sospechoso">Sospechoso</option>
							</Selector>
						</InputLabel>
						<InputLabel>
							¿Bloquear?
							<Selector
								name="blocked"
								required
								value={blocked}
								onChange={handleChangeText}>
								<option value="true">Si</option>
								<option value="false">No</option>
							</Selector>
						</InputLabel>
					</Option>
					<Option>
						<InputLabel>
							Calificación
							<Input
								name="rating"
								type="number"
								value={rating}
								onChange={handleChangeText}
								required
							/>
						</InputLabel>
						<InputLabel>
							País
							<Input
								name="country"
								type="text"
								value={country}
								label="País"
								onChange={handleChangeText}
							/>
						</InputLabel>
					</Option>
					<InputLabel>
						Comentario
						<Input
							name="comment"
							type="text"
							value={comment}
							label="Comentario"
							onChange={handleChangeText}
						/>
					</InputLabel>
					<ButtonContainer>
						<Button type="submit" buttonType={BUTTON_TYPE_CLASSES.seeMore}>
							Registrar
						</Button>
					</ButtonContainer>
				</form>
			</RegisterItemContent>
		</RegisterItemTabContainer>
	);
};

export default RegisterItemTab;
