import {
	IpListContainer,
	IpListHeader,
	FormWrapper,
	AddIpButton,
	CustomButton,
} from "./ip-list.styles";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useState } from "react";
import ScrollList from "../scroll-list/scroll-list.component";

const IpList = ({ handleAdd, reloadIpItemList, ipList }) => {
	const [ip, setIp] = useState("");
	const [formVisible, setFormVisible] = useState(false);
	const headersList = [
		"Dirección IP",
		"Clasificación",
		"Calificación",
		"Bloqueada",
		"Ultima Modificación",
	];
	const orderList = [
		"ipAdress",
		"classification",
		"calification",
		"blocked",
		"lastUpdate",
	];

	const handleChange = (event) => {
		const { value } = event.target;
		setIp(value);
	};

	const toggleForm = () => {
		setFormVisible((prev) => !prev);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const confirmed = window.confirm(
			`La siguiente IP sera añadida:\n\n[IP: ${ip}]\n\n¿Confirmar?`
		);
		if (!confirmed) return;
		const { success } = await handleAdd(ip);
		if (!success) {
			alert("There was an error adding the IP address");
			return;
		}
		setIp("");
		reloadIpItemList();
	};
	return (
		<IpListContainer>
			<IpListHeader formVisible={formVisible}>
				<span>Lista de IP's</span>

				<CustomButton
					buttonType={BUTTON_TYPE_CLASSES.seeMore}
					onClick={toggleForm}
					formVisible={formVisible}>
					Añadir IP {formVisible ? ">" : "<"}
				</CustomButton>

				<FormWrapper onSubmit={handleSubmit} formVisible={formVisible}>
					<input
						name="Ip"
						required
						value={ip}
						onChange={handleChange}
						type="text"
						minLength="7"
						maxLength="15"
						pattern="^((25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})$"
					/>
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

// const handleDeleteItem = async (ipItem) => {
// 	const confirmed = window.confirm(
// 		`La siguiente IP sera eliminada:\n\n[IP: ${ipItem}]\n\n¿Confirmar?`
// 	);
// 	if (!confirmed) return;
// 	const { success } = await handleDelete(ipItem);
// 	if (!success) {
// 		alert("There was an error deleting the IP address");
// 		return;
// 	}
// 	reloadIpItemList();
// };
