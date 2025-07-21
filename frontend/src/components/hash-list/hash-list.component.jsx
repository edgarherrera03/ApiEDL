import {
	HashListContainer,
	HashListHeader,
	FormWrapper,
	AddHashButton,
	CustomButton,
} from "./hash-list.styles";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useState } from "react";
import ScrollList from "../scroll-list/scroll-list.component";

const defaulNewHashFields = {
	hash: "",
	programName: "",
	classification: "",
	hashRating: "",
	blocked: "",
};

const HashList = ({ handleAdd, reloadHashItemList, hashList }) => {
	const [newHashFields, setNewHashFields] = useState(defaulNewHashFields);
	const [formVisible, setFormVisible] = useState(false);
	console.log(hashList);

	const { hash, programName, classification, hashRating, blocked } =
		newHashFields;
	const headersList = [
		"Hash",
		"Nombre del programa",
		"Clasificación",
		"Calificación",
		"Bloqueada",
		"Ultima Modificación",
	];
	const orderList = [
		"hash",
		"programName",
		"classification",
		"hashRating",
		"blocked",
		"lastUpdate",
	];

	const resetNewHashFields = () => setNewHashFields(defaulNewHashFields);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setNewHashFields({ ...newHashFields, [name]: value });
	};

	const toggleForm = () => {
		setFormVisible((prev) => !prev);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const confirmed = window.confirm(
			`El siguiente hash sera añadido:\n\n[Hash: ${hash}]\n\n¿Confirmar?`
		);
		if (!confirmed) return;
		const { success } = await handleAdd(newHashFields);
		if (!success) {
			alert("Hubo un error al añadir el hash");
			return;
		}
		resetNewHashFields();
		reloadHashItemList();
	};
	return (
		<HashListContainer>
			<HashListHeader>
				<span>Lista de Hashes</span>

				<CustomButton
					buttonType={BUTTON_TYPE_CLASSES.seeMore}
					onClick={toggleForm}
					$formVisible={formVisible}>
					Añadir Hash {formVisible ? ">" : "<"}
				</CustomButton>

				<FormWrapper onSubmit={handleSubmit} $formVisible={formVisible}>
					<input
						name="hash"
						required
						value={hash}
						onChange={handleChange}
						type="text"
						placeholder="Hash"
					/>
					<input
						name="programName"
						required
						value={programName}
						onChange={handleChange}
						type="text"
						placeholder="Nombre del programa"
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
						name="hashRating"
						required
						type="number"
						min={0}
						max={100}
						value={hashRating}
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
					<AddHashButton type="submit">+</AddHashButton>
				</FormWrapper>
			</HashListHeader>
			<ScrollList
				headersList={headersList}
				ordersList={orderList}
				itemList={hashList}
			/>
		</HashListContainer>
	);
};

export default HashList;
