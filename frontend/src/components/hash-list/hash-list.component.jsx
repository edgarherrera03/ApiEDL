import {
	HashListContainer,
	HashListHeader,
	FormWrapper,
	AddHashButton,
	CustomButton,
} from "./hash-list.styles";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useContext, useState, useEffect } from "react";
import ScrollList from "../scroll-list/scroll-list.component";
import { UserContext } from "../../context/user.context";
import { getItems } from "../../utils/api";

const defaulNewHashFields = {
	element: "",
	programName: "",
	classification: "",
	hashRating: "",
	blocked: "",
};

const HashList = ({
	handleAdd,
	handleDelete,
	clientUsername,
	reloadClientDetails,
}) => {
	const [newHashFields, setNewHashFields] = useState(defaulNewHashFields);
	const [formVisible, setFormVisible] = useState(false);
	const [hashList, setHashList] = useState([]);
	const { logout } = useContext(UserContext);

	const { element, programName, classification, hashRating, blocked } =
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
		"element",
		"programName",
		"classification",
		"hashRating",
		"blocked",
		"lastUpdate",
	];

	const fetchHash = async () => {
		const { success, error, code, items } = await getItems("HashList");
		if (success) {
			setHashList(
				items.filter((hash) => hash.clients.includes(clientUsername))
			);
		} else if (code === 401 || code === 403) {
			await logout();
		} else {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchHash();
	}, []);
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
			`El siguiente hash sera añadido:\n\n[Hash: ${element}]\n\n¿Confirmar?`
		);
		if (!confirmed) return;
		const { success } = await handleAdd(newHashFields, "HashList");
		if (!success) {
			alert("Hubo un error al añadir el hash");
			return;
		}
		resetNewHashFields();
		fetchHash();
		reloadClientDetails();
	};
	const handleDeleteHash = async (itemToDelete) => {
		const confirmed = window.confirm(
			`El Hash siguiente sera eliminada:\n\n[Hash: ${itemToDelete}]\n\n¿Confirmar?`
		);
		if (!confirmed) return;
		const { success, error, code } = await handleDelete(
			itemToDelete,
			"HashList"
		);
		if (code === 401 || code === 403) {
			await logout();
		} else if (code === 404) {
			alert(error);
		} else if (!success) {
			console.log(error);
		}
		fetchHash();
		reloadClientDetails();
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
						name="element"
						required
						value={element}
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
				handleDelete={handleDeleteHash}
			/>
		</HashListContainer>
	);
};

export default HashList;
