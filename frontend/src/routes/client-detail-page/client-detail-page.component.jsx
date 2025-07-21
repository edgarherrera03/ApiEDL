import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addHashRequest, requestClientByToken } from "../../utils/api";
import {
	ClientDetailPageContainer,
	ClientDetailContentContainer,
	ClientTitle,
} from "./client-detail-page.styles";
import LeftBarClient from "../../components/left-bar-client/left-bar-client.component";
import { CLIENT_ROUTES } from "../../components/left-bar-client/left-bar-client.component";
import {
	addIpAddressRequest,
	deleteIpAddressRequest,
	addIpWhiteListRequest,
	deleteIpWhiteListRequest,
	addWebsiteRequest,
	deleteWebsiteRequest,
} from "../../utils/api";
import GeneralInfoClient from "../../components/general-info-client/general-info-client.component";
import IpList from "../../components/ip-list/ip-list.component";
import DomainList from "../../components/domain-list/domain-list.component";
import HashList from "../../components/hash-list/hash-list.component";
import EdlProfiles from "../../components/edl-profiles/edl-profiles.component";

const ClientDetailPage = () => {
	const { token } = useParams();
	const [client, setClient] = useState(null);
	const [selectedRoute, setSelectedRoute] = useState(CLIENT_ROUTES.general);

	useEffect(() => {
		const fetchClient = async () => {
			const response = await requestClientByToken(token);
			if (response.success) {
				setClient(response.client);
			} else {
				alert(response.error || "Error fetching client details");
			}
		};

		fetchClient();
	}, [token]);

	const handleSelectRoute = (route) => {
		setSelectedRoute(route);
	};

	const reloadClientDetails = async () => {
		const response = await requestClientByToken(token);
		if (response.success) {
			setClient(response.client);
		} else {
			alert(response.error || "Error reloading client details");
		}
	};

	const handleAddIpAdress = async (ipAddressFields) => {
		const response = await addIpAddressRequest(token, ipAddressFields);
		return response;
	};

	const handleDeleteIpAddress = async (ipAddress) => {
		const response = await deleteIpAddressRequest(token, ipAddress);
		return response;
	};

	const handleAddIpWhiteList = async (ipAddress) => {
		const response = await addIpWhiteListRequest(token, ipAddress);
		return response;
	};

	const handleDeleteIpWhiteList = async (ipAddress) => {
		const response = await deleteIpWhiteListRequest(token, ipAddress);
		return response;
	};

	const handleAddWebsiteList = async (domainFields) => {
		const response = await addWebsiteRequest(token, domainFields);
		return response;
	};

	const handleDeleteWebsiteList = async (ipAddress) => {
		const response = await deleteWebsiteRequest(token, ipAddress);
		return response;
	};

	const handleAddHashList = async (hashFields) => {
		const response = await addHashRequest(token, hashFields);
		return response;
	};

	if (!client) return <p>Loading...</p>;
	console.log(client);

	return (
		<ClientDetailPageContainer>
			<LeftBarClient selected={selectedRoute} onSelect={handleSelectRoute} />
			<ClientDetailContentContainer>
				<ClientTitle>
					<h1>{client.name}</h1>
					<p>
						<span>Usuario:</span> {client.username}
					</p>
				</ClientTitle>
				{selectedRoute === CLIENT_ROUTES.general && (
					<>
						<GeneralInfoClient
							client={client}
							token={token}
							reloadClientDetails={reloadClientDetails}
						/>
						<EdlProfiles />
					</>
				)}
				{selectedRoute === CLIENT_ROUTES.ipList && (
					<IpList
						reloadIpItemList={reloadClientDetails}
						handleAdd={handleAddIpAdress}
						ipList={client.IpList}
					/>
				)}
				{selectedRoute === CLIENT_ROUTES.domainList && (
					<DomainList
						reloadDomainItemList={reloadClientDetails}
						handleAdd={handleAddWebsiteList}
						domainList={client.WebsiteList}
					/>
				)}
				{selectedRoute === CLIENT_ROUTES.hashList && (
					<HashList
						reloadHashItemList={reloadClientDetails}
						handleAdd={handleAddHashList}
						hashList={client.HashList}
					/>
				)}
			</ClientDetailContentContainer>
		</ClientDetailPageContainer>
	);
};

export default ClientDetailPage;
