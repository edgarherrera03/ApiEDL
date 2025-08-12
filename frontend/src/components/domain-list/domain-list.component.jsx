import {
	DomainListContainer,
	DomainListHeader,
	FormWrapper,
	AddDomainButton,
	CustomButton,
} from "./domain-list.styles";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useContext, useState, useEffect } from "react";
import ScrollList from "../scroll-list/scroll-list.component";
import { UserContext } from "../../context/user.context";
import { ItemsContext } from "../../context/items.context";
import { addCommentToItem } from "../../utils/api";

const DomainList = ({
	handleAdd,
	handleDelete,
	clientUsername,
	reloadClientDetails,
}) => {
	const [formVisible, setFormVisible] = useState(false);
	const [domains, setDomains] = useState([]);
	const { logout, currentUser } = useContext(UserContext);
	const [element, setElement] = useState("");
	const { domainList, reloadDomainList } = useContext(ItemsContext);
	const role = currentUser["role"];

	const headersList = [
		"Dominio",
		"Clasificación",
		"Calificación",
		"Bloqueada",
		"Ultima Modificación",
	];
	const orderList = [
		"element",
		"classification",
		"rating",
		"blocked",
		"lastUpdate",
	];

	useEffect(() => {
		setDomains(
			domainList.filter((domain) => domain.clients.includes(clientUsername))
		);
	}, [domainList, clientUsername]);

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
			`El siguiente dominio sera añadida:\n\n[Dominio: ${element}]\n\n¿Confirmar?`
		);
		if (!confirmed) return;
		const { success, error, code } = await handleAdd(element, "WebsiteList");
		if (!success && code === 404) {
			console.log(error || "No se encontró al cliente");
		} else if (code === 409 || code === 400 || code === 405) {
			alert(error);
		} else if (code === 403 || code === 401) {
			await logout();
		}
		setElement("");
		reloadClientDetails();
		reloadDomainList();
	};

	const handleDeleteDomain = async (itemToDelete) => {
		const confirmed = window.confirm(
			`El siguiente dominio sera eliminado:\n\n[Dominio: ${itemToDelete}]\n\n¿Confirmar?`
		);
		if (!confirmed) return;
		const { success, error, code } = await handleDelete(
			itemToDelete,
			"WebsiteList"
		);
		if (code === 401 || code === 403) {
			await logout();
		} else if (code === 404) {
			alert(error);
		} else if (!success) {
			console.log(error);
		}
		reloadClientDetails();
		reloadDomainList();
	};
	const handleComment = async (comment, item) => {
		const confirmed = window.confirm(
			`Se añadirá un nuevo comentario para el objeto ${item}\n\n¿Confirmar?`
		);
		if (confirmed) {
			const { success, error, code } = await addCommentToItem(
				currentUser["username"],
				"domain",
				comment,
				item
			);
			if (code === 401 || code === 403) {
				await logout();
			} else if (!success) {
				console.log(error);
			}
		}
		reloadDomainList();
	};
	return (
		<DomainListContainer>
			<DomainListHeader>
				<span>Lista de dominios</span>
				{role === "admin" && (
					<>
						<CustomButton
							buttonType={BUTTON_TYPE_CLASSES.seeMore}
							onClick={toggleForm}
							$formVisible={formVisible}>
							Añadir dominio {formVisible ? ">" : "<"}
						</CustomButton>

						<FormWrapper onSubmit={handleSubmit} $formVisible={formVisible}>
							<input
								name="element"
								required
								value={element}
								onChange={handleChange}
								type="text"
								minLength="4"
								maxLength="253"
								pattern="^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$"
								placeholder="Dominio"
							/>
							<AddDomainButton type="submit">+</AddDomainButton>
						</FormWrapper>
					</>
				)}
			</DomainListHeader>
			<ScrollList
				headersList={headersList}
				ordersList={orderList}
				itemList={domains}
				handleDelete={handleDeleteDomain}
				handleComment={handleComment}
			/>
		</DomainListContainer>
	);
};

export default DomainList;
