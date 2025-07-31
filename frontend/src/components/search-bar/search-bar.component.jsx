import { SearchBarContainer } from "./search-bar.styles";
import { useState } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import Select from "react-select";

const ratingOptions = [
	{ value: "Malicioso", label: "Malicioso" },
	{ value: "Seguro", label: "Seguro" },
	{ value: "Sospechoso", label: "Sospechoso" },
];
const elementOptions = [
	{ value: "IpList", label: "IP" },
	{ value: "WebsiteList", label: "Dominio" },
	{ value: "HashList", label: "Hash" },
];
const SearchBar = ({ clientsList, countryList }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedType, setSelectedType] = useState([]);
	const [selectedClients, setSelectedClients] = useState([]);
	const [selectedQualification, setSelectedQualification] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState([]);

	const handleClientChange = (selected) => {
		setSelectedClients(selected);
	};
	const handleQualificationChange = (selected) => {
		setSelectedQualification(selected);
	};
	const handleTypeChange = (selected) => {
		setSelectedType(selected);
	};
	const handleCountryChange = (selected) => {
		setSelectedCountry(selected);
	};
	return (
		<SearchBarContainer>
			<span>Filtros</span>
			<form action="">
				<input type="text" required />
				<Select
					isMulti
					options={clientsList}
					value={selectedClients}
					onChange={handleClientChange}
					placeholder="Seleccionar cliente(s)..."
					isSearchable
				/>
				<Select
					isMulti
					options={ratingOptions}
					value={selectedQualification}
					onChange={handleQualificationChange}
					placeholder="Clasificación"
					isSearchable
				/>
				<Select
					isMulti
					options={elementOptions}
					value={selectedType}
					onChange={handleTypeChange}
					placeholder="Tipo"
					isSearchable
				/>
				<Select
					isMulti
					options={countryList}
					value={selectedCountry}
					onChange={handleCountryChange}
					placeholder="País"
					isSearchable
				/>
				<Button buttonType={BUTTON_TYPE_CLASSES.seeMore}>Buscar</Button>
			</form>
		</SearchBarContainer>
	);
};

export default SearchBar;
