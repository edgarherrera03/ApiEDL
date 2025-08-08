import { SearchBarContainer, SelectFilter } from "./search-bar.styles";
import { useState } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
	ratingOptions,
	elementOptions,
	blockedOptions,
} from "../../routes/registros/registros.component";

const defaultFilterValues = {
	searchItem: "",
	selectedType: [],
	selectedClients: [],
	selectedQualification: [],
	selectedCountry: [],
	blocked: "",
};
const SearchBar = ({ clientsList, countryList, handleFiltering }) => {
	const [filterValues, setFilterValues] = useState(defaultFilterValues);
	const {
		searchItem,
		selectedType,
		selectedClients,
		selectedQualification,
		selectedCountry,
		blocked,
	} = filterValues;

	const handleSelectChange = (name) => (selectedOption) => {
		setFilterValues({ ...filterValues, [name]: selectedOption });
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFilterValues({ ...filterValues, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		handleFiltering(filterValues);
	};
	return (
		<SearchBarContainer>
			<span>Filtros</span>
			<form onSubmit={handleSubmit}>
				<input
					name="searchItem"
					value={searchItem}
					onChange={handleInputChange}
					type="text"
				/>
				<SelectFilter
					name="selectedClients"
					isMulti
					options={clientsList}
					value={selectedClients}
					onChange={handleSelectChange("selectedClients")}
					placeholder="Seleccionar cliente(s)..."
					isSearchable
				/>
				<SelectFilter
					name="selectedQualification"
					isMulti
					options={ratingOptions}
					value={selectedQualification}
					onChange={handleSelectChange("selectedQualification")}
					placeholder="Clasificación"
					isSearchable
					isClearable
				/>
				<SelectFilter
					name="blocked"
					options={blockedOptions}
					value={blocked}
					onChange={handleSelectChange("blocked")}
					placeholder="Bloquear"
					isSearchable
					isClearable
				/>
				<SelectFilter
					name="selectedType"
					isMulti
					options={elementOptions}
					value={selectedType}
					onChange={handleSelectChange("selectedType")}
					placeholder="Tipo"
					isSearchable
					isClearable
				/>
				<SelectFilter
					name="selectedCountry"
					isMulti
					options={countryList}
					value={selectedCountry}
					onChange={handleSelectChange("selectedCountry")}
					placeholder="País"
					isSearchable
					isClearable
				/>
				<Button buttonType={BUTTON_TYPE_CLASSES.seeMore}>Buscar</Button>
			</form>
		</SearchBarContainer>
	);
};

export default SearchBar;
