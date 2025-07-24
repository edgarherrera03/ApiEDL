import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
	requestClientByToken,
	addItemToList,
	deleteItemFromList,
} from "../../utils/api";
import {
	ClientDetailPageContainer,
	ClientDetailContentContainer,
	ClientTitle,
} from "./client-detail-page.styles";
import LeftBarClient from "../../components/left-bar-client/left-bar-client.component";
import { CLIENT_ROUTES } from "../../components/left-bar-client/left-bar-client.component";
import GeneralInfoClient from "../../components/general-info-client/general-info-client.component";
import IpList from "../../components/ip-list/ip-list.component";
import DomainList from "../../components/domain-list/domain-list.component";
import HashList from "../../components/hash-list/hash-list.component";
import EdlProfiles from "../../components/edl-profiles/edl-profiles.component";
import { UserContext } from "../../context/user.context";

const ClientDetailPage = () => {
	const { token } = useParams();
	const [client, setClient] = useState(null);
	const [selectedRoute, setSelectedRoute] = useState(CLIENT_ROUTES.general);
	const { currentUser } = useContext(UserContext);

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

	const handleAdd = async (itemFields, listType) => {
		const response = await addItemToList(
			currentUser["username"],
			token,
			itemFields,
			listType
		);
		return response;
	};

	const handleDelete = async (itemToDelete, listType) => {
		const response = await deleteItemFromList(
			currentUser["username"],
			token,
			itemToDelete,
			listType
		);
		return response;
	};

	if (!client) return <p>Loading...</p>;

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
						<EdlProfiles
							client={client}
							token={token}
							onReloadClients={reloadClientDetails}
						/>
					</>
				)}
				{selectedRoute === CLIENT_ROUTES.ipList && (
					<IpList
						reloadIpItemList={reloadClientDetails}
						handleAdd={handleAdd}
						ipList={client.IpList.info}
					/>
				)}
				{selectedRoute === CLIENT_ROUTES.domainList && (
					<DomainList
						reloadDomainItemList={reloadClientDetails}
						handleAdd={handleAdd}
						domainList={client.WebsiteList.info}
					/>
				)}
				{selectedRoute === CLIENT_ROUTES.hashList && (
					<HashList
						reloadHashItemList={reloadClientDetails}
						handleAdd={handleAdd}
						hashList={client.HashList.info}
					/>
				)}
			</ClientDetailContentContainer>
		</ClientDetailPageContainer>
	);
};

export default ClientDetailPage;
