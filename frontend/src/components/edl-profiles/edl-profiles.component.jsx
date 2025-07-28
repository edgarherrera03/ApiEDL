import { useContext, useState } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
	EdlProfilesContainer,
	TitleContainer,
	EdlProfile,
	EdlLink,
	TitleLinkContainer,
	Logo,
	InfoContainer,
	Info,
} from "./edl-profiles.styles";
import { modifyListLimitRequest } from "../../utils/api";
import { UserContext } from "../../context/user.context";

const profiles = [
	{
		icon: "🌐",
		title: "Lista de IPs bloqueadas",
		countLabel: "Cantidad de IPs bloqueadas:",
		lastModified: "14/07/2025",
		listTitle: "IpList",
	},
	{
		icon: "🔗",
		title: "Lista de dominios bloqueados",
		countLabel: "Cantidad de dominios bloqueados:",
		lastModified: "14/07/2025",
		listTitle: "WebsiteList",
	},
	{
		icon: "#️⃣",
		title: "Lista de Hashes bloqueados",
		countLabel: "Cantidad de hashes bloqueadas:",
		lastModified: "14/07/2025",
		listTitle: "HashList",
	},
];

const EdlProfiles = ({ client, token, onReloadClients }) => {
	const [copiedList, setCopiedList] = useState(null);
	const [listLimits, setListLimits] = useState({});
	const { currentUser, logout } = useContext(UserContext);
	const username = client.username;
	const apiKey = client.apiKey;

	const handleCopy = async (itemList) => {
		const textToCopy = `http://127.0.0.1:5000/api/utils/edls/get_edl?list_type=${itemList}&username=${username}&api_key=${apiKey}`;
		try {
			await navigator.clipboard.writeText(textToCopy);
			setCopiedList(itemList);
			setTimeout(() => setCopiedList(null), 3000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	const handleChange = (event, listTitle) => {
		const { value } = event.target;
		setListLimits((prevLimits) => ({
			...prevLimits,
			[listTitle]: value,
		}));
	};

	const handleModifyListLimit = async (event, listTitle) => {
		event.preventDefault();
		const limit = listLimits[listTitle];
		if (!limit) return;

		const confirmed = window.confirm(
			`El limite de registros para la lista ${listTitle} del usuario ${username} será modificado:\n\n[listLimit: ${limit}]\n\n¿Confirmar?`
		);

		if (confirmed) {
			const { success, error, code } = await modifyListLimitRequest(
				currentUser["username"],
				token,
				limit,
				listTitle
			);
			if (!success && code === 400) {
				alert(error);
			} else if (code === 403 || code === 401) {
				await logout();
			} else {
				console.log(error);
			}

			setListLimits((prev) => ({ ...prev, [listTitle]: "" }));
			onReloadClients();
		}
	};

	return (
		<EdlProfilesContainer>
			<TitleContainer>
				<span>Perfiles EDL</span>
			</TitleContainer>
			{profiles.map((profile, index) => (
				<EdlProfile key={index}>
					<EdlLink>
						<TitleLinkContainer>
							<Logo>
								<p>{profile.icon}</p>
							</Logo>
							<span>{profile.title}</span>
						</TitleLinkContainer>
						<InfoContainer>
							<Info>
								<p>
									<span>{profile.countLabel}</span>{" "}
									{client[profile.listTitle].info.length} /{" "}
									{client[profile.listTitle].listLimit}
								</p>
								<form
									onSubmit={(e) => handleModifyListLimit(e, profile.listTitle)}>
									<input
										type="number"
										placeholder="Nuevo registro maximo"
										value={listLimits[profile.listTitle] || ""}
										onChange={(e) => handleChange(e, profile.listTitle)}
										required
									/>
									<button type="submit">Actualizar</button>
								</form>
							</Info>
							<Info>
								<p>
									<span>Última modificación: </span>
									{client[profile.listTitle].lastUpdate}
								</p>
								<Button
									buttonType={BUTTON_TYPE_CLASSES.seeMore}
									onClick={() => handleCopy(profile.listTitle)}>
									{copiedList === profile.listTitle
										? "✓ Copiar link"
										: "❏ Copiar link"}
								</Button>
							</Info>
						</InfoContainer>
					</EdlLink>
				</EdlProfile>
			))}
		</EdlProfilesContainer>
	);
};

export default EdlProfiles;
