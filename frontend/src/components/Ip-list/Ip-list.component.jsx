import {
	IpListContainer,
	IpListHeader,
	FormWrapper,
	AddIpButton,
	CustomButton,
} from "./ip-list.styles";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useContext, useState, useEffect } from "react";
import ScrollList from "../scroll-list/scroll-list.component";
import { UserContext } from "../../context/user.context";
import { addCommentToItem } from "../../utils/api";
import { ItemsContext } from "../../context/items.context";

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
	"rating",
	"blocked",
	"lastUpdate",
];
const IpList = ({
	handleAdd,
	handleDelete,
	clientUsername,
	reloadClientDetails,
}) => {
	const [formVisible, setFormVisible] = useState(false);
	const [element, setElement] = useState("");
	const [ip, setIp] = useState([]);
	const { ipList, reloadIpList } = useContext(ItemsContext);
	const { logout, currentUser } = useContext(UserContext);

	useEffect(() => {
		setIp(ipList.filter((ip) => ip.clients.includes(clientUsername)));
	}, [ipList, clientUsername]);

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
			`La siguiente IP sera añadida:\n\n[IP: ${element}]\n\n¿Confirmar?`
		);
		if (!confirmed) return;
		const { success, error, code } = await handleAdd(element, "IpList");
		if (!success && code === 404) {
			console.log(error || "No se encontró al cliente");
		} else if (code === 409) {
			alert("La IP que se intentó añadir ya existe");
		} else if (code === 403 || code === 401) {
			await logout();
		}
		setElement("");
		reloadIpList();
		reloadClientDetails();
	};

	const handleDeleteIp = async (itemToDelete) => {
		const confirmed = window.confirm(
			`La siguiente IP sera eliminada:\n\n[IP: ${itemToDelete}]\n\n¿Confirmar?`
		);
		if (!confirmed) return;
		const { success, error, code } = await handleDelete(itemToDelete, "IpList");
		if (code === 401 || code === 403) {
			await logout();
		} else if (code === 404) {
			alert(error);
		} else if (!success) {
			console.log(error);
		}
		reloadIpList();
		reloadClientDetails();
	};

	const handleComment = async (comment, item) => {
		const confirmed = window.confirm(
			`Se añadirá un nuevo comentario para el objeto ${item}\n\n¿Confirmar?`
		);
		if (confirmed) {
			const { success, error, code } = await addCommentToItem(
				currentUser["username"],
				"IpList",
				comment,
				item
			);
			if (code === 401 || code === 403) {
				await logout();
			} else if (!success) {
				console.log(error);
			}
		}
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
					<AddIpButton type="submit">+</AddIpButton>
				</FormWrapper>
			</IpListHeader>
			<ScrollList
				headersList={headersList}
				ordersList={orderList}
				itemList={ip}
				handleDelete={handleDeleteIp}
				handleComment={handleComment}
			/>
		</IpListContainer>
	);
};

export default IpList;
