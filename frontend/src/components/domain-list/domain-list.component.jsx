import {
	DomainListContainer,
	DomainListHeader,
	FormWrapper,
	AddDomainButton,
	CustomButton,
} from "./domain-list.styles";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useState } from "react";
import ScrollList from "../scroll-list/scroll-list.component";

const defaulNewDomainFields = {
	domain: "",
	classification: "",
	ipRating: "",
	blocked: "",
};

const DomainList = ({ handleAdd, reloadDomainItemList, domainList }) => {
	const [newDomainFields, setNewDomainFields] = useState(defaulNewDomainFields);
	const [formVisible, setFormVisible] = useState(false);

	const { domain, classification, ipRating, blocked } = newDomainFields;
	const headersList = [
		"Dominio",
		"Clasificación",
		"Calificación",
		"Bloqueada",
		"Ultima Modificación",
	];
	const orderList = [
		"domain",
		"classification",
		"ipRating",
		"blocked",
		"lastUpdate",
	];

	const resetNewDomainFields = () => setNewDomainFields(defaulNewDomainFields);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setNewDomainFields({ ...newDomainFields, [name]: value });
	};

	const toggleForm = () => {
		setFormVisible((prev) => !prev);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const confirmed = window.confirm(
			`El siguiente dominio sera añadida:\n\n[Dominio: ${domain}]\n\n¿Confirmar?`
		);
		if (!confirmed) return;
		const { success } = await handleAdd(newDomainFields, "WebsiteList");
		if (!success) {
			alert("Hubo un error al añadir el dominio");
			return;
		}
		resetNewDomainFields();
		reloadDomainItemList();
	};
	return (
		<DomainListContainer>
			<DomainListHeader>
				<span>Lista de dominios</span>

				<CustomButton
					buttonType={BUTTON_TYPE_CLASSES.seeMore}
					onClick={toggleForm}
					$formVisible={formVisible}>
					Añadir dominio {formVisible ? ">" : "<"}
				</CustomButton>

				<FormWrapper onSubmit={handleSubmit} $formVisible={formVisible}>
					<input
						name="domain"
						required
						value={domain}
						onChange={handleChange}
						type="text"
						minLength="4"
						maxLength="253"
						pattern="^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$"
						placeholder="Dominio"
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
						placeholder="Calificacion"
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
					<AddDomainButton type="submit">+</AddDomainButton>
				</FormWrapper>
			</DomainListHeader>
			<ScrollList
				headersList={headersList}
				ordersList={orderList}
				itemList={domainList}
			/>
		</DomainListContainer>
	);
};

export default DomainList;
