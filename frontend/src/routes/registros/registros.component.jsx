import {
	RegistrosContainer,
	RegistrosInformationContainer,
} from "./registros.styles";
import { useContext, useEffect, useState } from "react";
import LeftBar from "../../components/left-bar/left-bar.component";
import SearchTab from "../../components/search-tab/search-tab.component";
import { ClientsContext } from "../../context/clients.context";
import { ItemsContext } from "../../context/items.context";
import RegisterItemTab from "../../components/register-item-tab/register-item-tab.component";
import InvestigateTab from "../../components/investigate-tab/investigate-tab.component";
import Spinner from "../../components/spinner/spinner.component";
import { UserContext } from "../../context/user.context";

export const REGISTER_ROUTES = {
	buscar: "buscar",
	investigar: "investigar",
	registrar: "registrar",
};

const routes = {
	buscar: "Buscar",
	investigar: "Investigar",
	registrar: "Registrar",
};

export const ratingOptions = [
	{ value: "Malicioso", label: "Malicioso" },
	{ value: "Seguro", label: "Seguro" },
	{ value: "Sospechoso", label: "Sospechoso" },
];
export const elementOptions = [
	{ value: "ip", label: "IP" },
	{ value: "domain", label: "Dominio" },
	{ value: "hash", label: "Hash" },
];
export const blockedOptions = [
	{ value: true, label: "Bloqueado" },
	{ value: false, label: "No Bloqueado" },
];

const Registros = () => {
	const [selectedRoute, setSelectedRoute] = useState(REGISTER_ROUTES.buscar);
	const { clientsList } = useContext(ClientsContext);
	const { ipList, domainList, hashList } = useContext(ItemsContext);
	const { currentUser } = useContext(UserContext);
	const [clientsOption, setClientsOption] = useState([]);
	const [generalList, setGeneralList] = useState([]);
	const [countryOptions, setCountryOptions] = useState([]);
	const [investigateResult, setInvestigateResult] = useState({});

	const role = currentUser["role"];

	useEffect(() => {
		setClientsOption(
			clientsList.map((client) => ({
				value: client.username,
				label: client.name,
			}))
		);
		setGeneralList([...ipList, ...domainList, ...hashList]);

		const allCountries = [
			...ipList.map((item) => item.country),
			...domainList.map((item) => item.country),
			...hashList.map((item) => item.country),
		];
		const uniqueCountries = Array.from(new Set(allCountries.filter(Boolean)));
		setCountryOptions(
			uniqueCountries.map((country) => ({
				value: country,
				label: country,
			}))
		);
	}, [clientsList, ipList, domainList, hashList]);

	const handleSelectRoute = (route) => {
		setSelectedRoute(route);
	};

	const handleInvestigateResult = (result) => {
		setInvestigateResult(result);
		setSelectedRoute(REGISTER_ROUTES.registrar);
	};

	const loading =
		clientsList === undefined ||
		ipList === undefined ||
		domainList === undefined ||
		hashList === undefined ||
		(clientsOption.length === 0 && clientsList.length > 0) ||
		(generalList.length === 0 &&
			(ipList.length > 0 || domainList.length > 0 || hashList.length > 0)) ||
		(countryOptions.length === 0 && generalList.length > 0);

	if (loading) return <Spinner />;
	return (
		<RegistrosContainer>
			<LeftBar
				routes={routes}
				selected={selectedRoute}
				onSelect={handleSelectRoute}
			/>
			<RegistrosInformationContainer>
				{selectedRoute === REGISTER_ROUTES.buscar && (
					<SearchTab
						clientsList={clientsOption}
						countryList={countryOptions}
						generalList={generalList}
					/>
				)}
				{selectedRoute === REGISTER_ROUTES.investigar && (
					<InvestigateTab handleInvestigateResult={handleInvestigateResult} />
				)}
				{role === "admin" && selectedRoute === REGISTER_ROUTES.registrar && (
					<RegisterItemTab
						clientsList={clientsOption}
						investigateResult={investigateResult}
					/>
				)}
			</RegistrosInformationContainer>
		</RegistrosContainer>
	);
};

export default Registros;
