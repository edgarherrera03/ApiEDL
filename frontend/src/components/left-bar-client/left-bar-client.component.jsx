import { LeftBarClientContainer, LeftBarRoute } from "./left-bar-client.styles";

export const CLIENT_ROUTES = {
	general: "general",
	ipList: "ipList",
	domainList: "domainList",
	hashList: "hashList",
};

const LeftBarClient = ({ selected, onSelect }) => {
	return (
		<LeftBarClientContainer>
			<LeftBarRoute
				$selected={selected === CLIENT_ROUTES.general}
				onClick={() => onSelect(CLIENT_ROUTES.general)}>
				<span>General</span>
			</LeftBarRoute>
			<LeftBarRoute
				$selected={selected === CLIENT_ROUTES.ipList}
				onClick={() => onSelect(CLIENT_ROUTES.ipList)}>
				<span>Lista de IPs</span>
			</LeftBarRoute>
			<LeftBarRoute
				$selected={selected === CLIENT_ROUTES.domainList}
				onClick={() => onSelect(CLIENT_ROUTES.domainList)}>
				<span>Lista de Dominios</span>
			</LeftBarRoute>
			<LeftBarRoute
				$selected={selected === CLIENT_ROUTES.hashList}
				onClick={() => onSelect(CLIENT_ROUTES.hashList)}>
				<span>Lista de Hash</span>
			</LeftBarRoute>
		</LeftBarClientContainer>
	);
};

export default LeftBarClient;
