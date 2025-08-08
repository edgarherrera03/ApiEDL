import ScrollList from "../scroll-list/scroll-list.component";
import SearchBar from "../search-bar/search-bar.component";
// import ActionBar from "../action-bar/action-bar.component";
import { useContext, useState, useEffect } from "react";
import {
	SearchTabContainer,
	SearchTabTitle,
	SearchTabContent,
} from "./search-tab.styles";
import { deleteItem } from "../../utils/api";
import { UserContext } from "../../context/user.context";
import { ItemsContext } from "../../context/items.context";

const headersList = [
	"Objeto",
	"Ultima modificación",
	"Clasificación",
	"Calificación",
	"Bloqueado",
	"Cliente",
	"País",
	"Añadido por",
];

const orderList = [
	"element",
	"lastUpdate",
	"classification",
	"rating",
	"blocked",
	"clients",
	"country",
	"addedBy",
];
const SearchTab = ({ clientsList, countryList, generalList }) => {
	const [filteredList, setFilteredList] = useState(generalList);
	const { currentUser, logout } = useContext(UserContext);
	const { reloadItems } = useContext(ItemsContext);

	useEffect(() => {
		setFilteredList(generalList);
	}, [generalList]);
	const handleFiltering = (filterValues) => {
		const {
			searchItem,
			selectedType,
			selectedClients,
			selectedQualification,
			selectedCountry,
			blocked,
		} = filterValues;

		// Vamos a contruir la lista de objetos filtrada en basa a los filtros que recibimos
		let filtered = generalList;
		if (selectedType.length > 0) {
			const typeValues = selectedType.map((t) => t.value);
			filtered = filtered.filter((item) => typeValues.includes(item.type));
		}
		if (searchItem) {
			filtered = filtered.filter((item) => item.element.includes(searchItem));
		}
		if (selectedClients.length > 0) {
			const clientValues = selectedClients.map((t) => t.value);
			filtered = filtered.filter((item) =>
				clientValues.some((val) => item.clients.includes(val))
			);
		}
		if (selectedQualification.length > 0) {
			const qualificationValues = selectedQualification.map((t) => t.value);
			filtered = filtered.filter((item) =>
				qualificationValues.includes(item.classification)
			);
		}
		if (selectedCountry.length > 0) {
			const countryValues = selectedCountry.map((t) => t.value);
			filtered = filtered.filter((item) =>
				countryValues.includes(item.country)
			);
		}
		if (blocked) {
			const { value } = blocked;
			filtered = filtered.filter((item) => value === item.blocked);
		}

		setFilteredList(filtered);
	};

	const handleDelete = async (itemToDelete, listType) => {
		const confirmed = window.confirm(
			`El elemento siguiente sera eliminado:\n\n${itemToDelete}\n\n¿Confirmar?`
		);
		if (!confirmed) {
			return;
		}
		const { success, error, code } = await deleteItem(
			currentUser["username"],
			itemToDelete,
			listType
		);
		if (code === 401 || code === 403) {
			await logout();
		} else if (code === 404) {
			alert(error);
		} else if (!success) {
			console.log(error);
		}
		reloadItems();
	};
	return (
		<SearchTabContainer>
			<SearchTabTitle>
				<h1>Buscar</h1>
			</SearchTabTitle>
			<SearchTabContent>
				{/* <ActionBar
					clientsList={clientsList}
					countryList={countryList}
					handleFiltering={handleFiltering}
				/> */}
				<SearchBar
					clientsList={clientsList}
					countryList={countryList}
					handleFiltering={handleFiltering}
				/>
				<ScrollList
					headersList={headersList}
					ordersList={orderList}
					itemList={filteredList}
					handleDelete={handleDelete}
					height={600}
				/>
			</SearchTabContent>
		</SearchTabContainer>
	);
};

export default SearchTab;
