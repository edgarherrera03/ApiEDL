import { useState } from "react";
import { DomainListContainer, DomainListHeader } from "./domain-list.styles";
import ScrollListBar from "../scroll-list-bar/scroll-list-bar.component";

const DomainList = ({
	ipItemList,
	header,
	handleAdd,
	handleDelete,
	reloadIpItemList,
}) => {
	const [domain, setDomain] = useState("");
	const resetDomainField = () => {
		setDomain("");
	};
	const handleChange = (event) => {
		const { value } = event.target;
		setDomain(value);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const confirmed = window.confirm(
			`El siguiente dominio sera añadido:\n\n[Dominio: ${domain}]\n\n¿Confirmar?`
		);
		if (!confirmed) return;
		const { success } = await handleAdd(domain);
		if (!success) {
			alert("Hubo un error al añadir el dominio");
			return;
		}
		resetDomainField();
		reloadIpItemList();
	};

	const handleDeleteItem = async (domainItem) => {
		const confirmed = window.confirm(
			`El siguiente dominio sera eliminado:\n\n[IP: ${domainItem}]\n\n¿Confirmar?`
		);
		if (!confirmed) return;
		const { success } = await handleDelete(domainItem);
		if (!success) {
			alert("Hubo un error al eliminar el dominio");
			return;
		}
		reloadIpItemList();
	};

	return (
		<DomainListContainer>
			<DomainListHeader>{header}</DomainListHeader>
			<form onSubmit={handleSubmit}>
				<label>Dominio</label>
				<input
					name="domain"
					required
					value={domain}
					onChange={handleChange}
					type="text"
					pattern="^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$"
				/>
				<button type="submit">+</button>
			</form>
			<ScrollListBar items={ipItemList} onDelete={handleDeleteItem} />
		</DomainListContainer>
	);
};

export default DomainList;
