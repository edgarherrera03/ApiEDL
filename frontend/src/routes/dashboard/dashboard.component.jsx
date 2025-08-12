import {
	DashboardContainer,
	ChartContainer,
	DashboardTitle,
	DashboardContent,
} from "./dashboard.styles";
import PieChartComponent from "../../components/pie-chart/pie-chart.component";
import LineChartComponent from "../../components/line-chart/line-chart.component";
import { useContext, useState } from "react";
import { ItemsContext } from "../../context/items.context";
import LeftBar from "../../components/left-bar/left-bar.component";
import { ClientsContext } from "../../context/clients.context";

const DASHBOARD_ROUTES = {
	general: "general",
	ip: "ip",
	domain: "domain",
	hash: "hash",
};

const routes = {
	general: "General",
	ip: "IPs",
	domain: "Dominios",
	hash: "Hash",
};

const classification = ["Malicioso", "Sospechoso", "Seguro"];

const Dashboard = () => {
	const [selectedRoute, setSelectedRoute] = useState(DASHBOARD_ROUTES.general);
	const { ipList, domainList, hashList } = useContext(ItemsContext);
	const { clientsList } = useContext(ClientsContext);

	const blockedIps = ipList.filter((ip) => ip.blocked).length;
	const nonBlockedIps = ipList.length - blockedIps;
	const blockedDomains = domainList.filter((domain) => domain.blocked).length;
	const nonBlockedDomains = domainList.length - blockedDomains;
	const blockedHash = hashList.filter((hash) => hash.blocked).length;
	const nonBlockedHash = hashList.length - blockedHash;

	const ipsPerClient = clientsList.map((client) => {
		return {
			name: client.username,
			value: ipList.filter((ip) => ip.clients?.includes(client.username))
				.length,
		};
	});
	const ipsBlockedPerClient = clientsList.map((client) => {
		return {
			name: client.username,
			value: ipList.filter(
				(ip) => ip.clients?.includes(client.username) && ip.blocked
			).length,
		};
	});

	const ipsClassification = classification.map((c) => {
		return {
			name: c,
			value: ipList.filter((ip) => ip.classification === c).length,
		};
	});

	const domainPerClient = clientsList.map((client) => {
		return {
			name: client.username,
			value: domainList.filter((domain) =>
				domain.clients?.includes(client.username)
			).length,
		};
	});
	const domainBlockedPerClient = clientsList.map((client) => {
		return {
			name: client.username,
			value: domainList.filter(
				(domain) => domain.clients?.includes(client.username) && domain.blocked
			).length,
		};
	});

	const domainClassification = classification.map((c) => {
		return {
			name: c,
			value: domainList.filter((domain) => domain.classification === c).length,
		};
	});
	const hashPerClient = clientsList.map((client) => {
		return {
			name: client.username,
			value: hashList.filter((hash) => hash.clients?.includes(client.username))
				.length,
		};
	});
	const hashBlockedPerClient = clientsList.map((client) => {
		return {
			name: client.username,
			value: hashList.filter(
				(hash) => hash.clients?.includes(client.username) && hash.blocked
			).length,
		};
	});

	const hashClassification = classification.map((c) => {
		return {
			name: c,
			value: hashList.filter((hash) => hash.classification === c).length,
		};
	});

	const ItemsGeneralInfo = [
		{
			labelTitle: "IPs",
			data: [
				{ name: "IP Bloqueadas", value: blockedIps },
				{ name: "IP Desbloqueadas", value: nonBlockedIps },
			],
		},
		{
			labelTitle: "Dominios",
			data: [
				{ name: "Dominios Bloqueados", value: blockedDomains },
				{ name: "Dominios Desbloqueados", value: nonBlockedDomains },
			],
		},
		{
			labelTitle: "Hash",
			data: [
				{ name: "Hash Bloqueados", value: blockedHash },
				{ name: "Hash Desbloqueados", value: nonBlockedHash },
			],
		},
	];
	const ItemsIpInfo = [
		{
			labelTitle: "IPs por cliente",
			data: ipsPerClient,
		},
		{
			labelTitle: "IPs bloqueadas por cliente",
			data: ipsBlockedPerClient,
		},
		{
			labelTitle: "Clasificación de IPs",
			data: ipsClassification,
		},
	];
	const ItemsDomainInfo = [
		{
			labelTitle: "Dominios por cliente",
			data: domainPerClient,
		},
		{
			labelTitle: "Dominios bloqueados por cliente",
			data: domainBlockedPerClient,
		},
		{
			labelTitle: "Clasificación de Dominios",
			data: domainClassification,
		},
	];
	const ItemsHashInfo = [
		{
			labelTitle: "Hash por cliente",
			data: hashPerClient,
		},
		{
			labelTitle: "Hash bloqueados por cliente",
			data: hashBlockedPerClient,
		},
		{
			labelTitle: "Clasificación de Hash",
			data: hashClassification,
		},
	];
	const handleSelectRoute = (route) => {
		setSelectedRoute(route);
	};
	return (
		<DashboardContainer>
			<LeftBar
				selected={selectedRoute}
				onSelect={handleSelectRoute}
				routes={routes}
			/>
			<ChartContainer>
				<DashboardTitle>
					<h1>Dashboard</h1>
				</DashboardTitle>
				<DashboardContent>
					{selectedRoute === DASHBOARD_ROUTES.general &&
						ItemsGeneralInfo.map((item) => (
							<PieChartComponent key={item.labelTitle} item={item} />
						))}
					{selectedRoute === DASHBOARD_ROUTES.ip && (
						<>
							{ItemsIpInfo.map((item) => (
								<PieChartComponent key={item.labelTitle} item={item} />
							))}
							<LineChartComponent
								labelTitle="IPs bloqueadas vs agregadas"
								itemList={ipList}
							/>
						</>
					)}
					{selectedRoute === DASHBOARD_ROUTES.domain && (
						<>
							{ItemsDomainInfo.map((item) => (
								<PieChartComponent key={item.labelTitle} item={item} />
							))}
							<LineChartComponent
								labelTitle="Dominios bloqueados vs agregados"
								itemList={domainList}
							/>
						</>
					)}
					{selectedRoute === DASHBOARD_ROUTES.hash && (
						<>
							{ItemsHashInfo.map((item) => (
								<PieChartComponent key={item.labelTitle} item={item} />
							))}
							<LineChartComponent
								labelTitle="Hash bloqueados vs agregados"
								itemList={hashList}
							/>
						</>
					)}
				</DashboardContent>
			</ChartContainer>
		</DashboardContainer>
	);
};
export default Dashboard;
