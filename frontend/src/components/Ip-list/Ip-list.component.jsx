import { useState } from "react";
import { IpListContainer, IpListHeader } from "./Ip-list.styles";
import ScrollListBar from "../scroll-list-bar/scroll-list-bar.component";

const IpList = ({
	ipItemList,
	header,
	handleAdd,
	handleDelete,
	reloadIpItemList,
}) => {
	const [ip, setIp] = useState("");
	const resetIpField = () => {
		setIp("");
	};
	const handleChange = (event) => {
		const { value } = event.target;
		setIp(value);
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
		resetIpField();
		reloadIpItemList();
	};

	const handleDeleteItem = async (ipItem) => {
		const confirmed = window.confirm(
			`La siguiente IP sera eliminada:\n\n[IP: ${ipItem}]\n\n¿Confirmar?`
		);
		if (!confirmed) return;
		const { success } = await handleDelete(ipItem);
		if (!success) {
			alert("There was an error deleting the IP address");
			return;
		}
		reloadIpItemList();
	};

	return (
		<IpListContainer>
			<IpListHeader>{header}</IpListHeader>
			<form onSubmit={handleSubmit}>
				<label>IP</label>
				<input
					name="ip"
					required
					value={ip}
					onChange={handleChange}
					type="text"
					minLength="7"
					maxLength="15"
					size="15"
					pattern="^((25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})$"
				/>
				<button type="submit">+</button>
			</form>
			<ScrollListBar items={ipItemList} onDelete={handleDeleteItem} />
		</IpListContainer>
	);
};

export default IpList;
