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
import { ItemsContext } from "../../context/items.context";

const HashList = ({
	handleAdd,
	handleDelete,
	clientUsername,
	reloadClientDetails,
}) => {
	const [formVisible, setFormVisible] = useState(false);
	const [element, setElement] = useState("");
	const [hashes, setHashes] = useState([]);
	const { logout } = useContext(UserContext);
	const { hashList, reloadHashList } = useContext(ItemsContext);

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
		"rating",
		"blocked",
		"lastUpdate",
	];

	useEffect(() => {
		setHashes(hashList.filter((hash) => hash.clients.includes(clientUsername)));
	}, [hashList, clientUsername]);

	const handleChange = (event) => {
		const { value } = event.target;
		setElement(value);
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
		const { success } = await handleAdd(element, "HashList");
		if (!success) {
			alert("Hubo un error al añadir el hash");
			return;
		}
		setElement("");
		reloadClientDetails();
		reloadHashList();
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
		reloadClientDetails();
		reloadHashList();
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
					<AddHashButton type="submit">+</AddHashButton>
				</FormWrapper>
			</HashListHeader>
			<ScrollList
				headersList={headersList}
				ordersList={orderList}
				itemList={hashes}
				handleDelete={handleDeleteHash}
			/>
		</HashListContainer>
	);
};

export default HashList;
