import {
	RegistrosContainer,
	RegistrosInformationContainer,
} from "./registros.styles";
import { useContext, useState } from "react";
import LeftBar from "../../components/left-bar/left-bar.component";
import SearchTab from "../../components/search-tab/search-tab.component";
import { ClientsContext } from "../../context/clients.context";
import { ItemsContext } from "../../context/items.context";

const REGISTER_ROUTES = {
	buscar: "buscar",
	investigar: "investigar",
	registrar: "registrar",
};

const routes = {
	buscar: "Buscar",
	investigar: "Investigar",
	registrar: "Registrar",
};

const Registros = () => {
	const [selectedRoute, setSelectedRoute] = useState(REGISTER_ROUTES.buscar);
	const { clientsList } = useContext(ClientsContext);
	const { ipList, domainList, hashList } = useContext(ItemsContext);

	// Lista de clientes presentes en el select
	const clientsOption = clientsList.map((client) => ({
		value: client.username,
		label: client.name,
	}));

	// Lista de todos los elementos

	// Lista de paises presentes en el select
	const allCountries = [
		...ipList.map((item) => item.country),
		...domainList.map((item) => item.country),
		...hashList.map((item) => item.country),
	];
	const uniqueCountries = Array.from(new Set(allCountries.filter(Boolean)));
	const countryOptions = uniqueCountries.map((country) => ({
		value: country,
		label: country,
	}));

	// Permite seleccionar ruta que se debe mostrar (buscar, investigar o registrar)
	const handleSelectRoute = (route) => {
		setSelectedRoute(route);
	};
	return (
		<RegistrosContainer>
			<LeftBar
				routes={routes}
				selected={selectedRoute}
				onSelect={handleSelectRoute}
			/>
			<RegistrosInformationContainer>
				{selectedRoute === REGISTER_ROUTES.buscar && (
					<SearchTab clientsList={clientsOption} countryList={countryOptions} />
				)}
			</RegistrosInformationContainer>
		</RegistrosContainer>
	);
};

export default Registros;
