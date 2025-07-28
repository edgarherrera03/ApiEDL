import {
	IpListContainer,
	IpListHeader,
	FormWrapper,
	AddIpButton,
	CustomButton,
} from "./ip-list.styles";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useContext, useState } from "react";
import ScrollList from "../scroll-list/scroll-list.component";
import { UserContext } from "../../context/user.context";

const defaulNewIpFields = {
	element: "",
	classification: "",
	ipRating: "",
	blocked: "",
};

const IpList = ({ handleAdd, reloadIpItemList, ipList }) => {
	const [newIpFields, setNewIpFields] = useState(defaulNewIpFields);
	const [formVisible, setFormVisible] = useState(false);
	const { logout } = useContext(UserContext);

	const { element, classification, ipRating, blocked } = newIpFields;
	const headersList = [
		"Dirección IP",
		"Clasificación",
		"Calificación",
		"Bloqueada",
		"Ultima Modificación",
	];
	const orderList = [
		"element",
		"classification",
		"ipRating",
		"blocked",
		"lastUpdate",
	];

	const resetNewIpFields = () => setNewIpFields(defaulNewIpFields);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setNewIpFields({ ...newIpFields, [name]: value });
	};

	const toggleForm = () => {
		setFormVisible((prev) => !prev);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const confirmed = window.confirm(
			`La siguiente IP sera añadida:\n\n[IP: ${element}]\n\n¿Confirmar?`
		);
		if (!confirmed) return;
		const { success, error, code } = await handleAdd(newIpFields, "IpList");
		if (!success && code === 404) {
			console.log(error || "No se encontró al cliente");
		} else if (code === 409) {
			alert("La IP que se intentó añadir ya existe");
		} else if (code === 403 || code === 401) {
			await logout();
		}
		resetNewIpFields();
		reloadIpItemList();
	};
	return (
		<IpListContainer>
			<IpListHeader>
				<span>Lista de IP's</span>

				<CustomButton
					buttonType={BUTTON_TYPE_CLASSES.seeMore}
					onClick={toggleForm}
					$formVisible={formVisible}>
					Añadir IP {formVisible ? ">" : "<"}
				</CustomButton>

				<FormWrapper onSubmit={handleSubmit} $formVisible={formVisible}>
					<input
						name="element"
						required
						value={element}
						onChange={handleChange}
						type="text"
						minLength="7"
						maxLength="15"
						pattern="^((25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})$"
						placeholder="Dirección IPv4"
					/>
					<select
						name="classification"
						required
						value={classification}
						onChange={handleChange}>
						<option value="">Clasificación</option>
						<option value="Seguro">Seguro</option>
						<option value="Sospechoso">Sospechoso</option>
						<option value="Malicioso">Malicioso</option>
					</select>
					<input
						name="ipRating"
						required
						type="number"
						min={0}
						max={100}
						value={ipRating}
						onChange={handleChange}
						placeholder="Calificación"
					/>
					<select
						name="blocked"
						required
						value={blocked}
						onChange={handleChange}>
						<option value="">Estatus</option>
						<option value={true}>Bloqueado</option>
						<option value={false}>Permitido</option>
					</select>
					<AddIpButton type="submit">+</AddIpButton>
				</FormWrapper>
			</IpListHeader>
			<ScrollList
				headersList={headersList}
				ordersList={orderList}
				itemList={ipList}
			/>
		</IpListContainer>
	);
};

export default IpList;
