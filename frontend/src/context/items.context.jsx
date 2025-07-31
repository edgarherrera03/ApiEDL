import { createContext, useState, useEffect, useContext } from "react";
import { getItems } from "../utils/api";
import { UserContext } from "./user.context";

export const ItemsContext = createContext({
	ipList: [],
	setIpList: () => null,
	reloadIpList: () => null,
	domainList: [],
	setDomainList: () => null,
	reloadDomainList: () => null,
	hashList: [],
	setHashList: () => null,
	reloadHashList: () => null,
});

export const ItemsProvider = ({ children }) => {
	const [ipList, setIpList] = useState([]);
	const [domainList, setDomainList] = useState([]);
	const [hashList, setHashList] = useState([]);
	const { logout, setLoading } = useContext(UserContext);

	useEffect(() => {
		const fetchItems = async () => {
			const ip = await getItems("IpList");
			const website = await getItems("WebsiteList");
			const hash = await getItems("HashList");

			if (ip.success && website.success && hash.success) {
				setIpList(ip.items);
				setDomainList(website.items);
				setHashList(hash.items);
			}
			setLoading(false);
		};
		fetchItems();
	}, [setLoading]);

	const reloadIpList = async () => {
		const { success, code, items, error } = await getItems("IpList");
		if (success) {
			setIpList(items);
		} else if (code === 404) {
			console.log(error);
		} else if (code === 403 || code === 401) {
			await logout();
		}
	};
	const reloadDomainList = async () => {
		const { success, code, items, error } = await getItems("WebsiteList");
		if (success) {
			setDomainList(items);
		} else if (code === 404) {
			console.log(error);
		} else if (code === 403 || code === 401) {
			await logout();
		}
	};
	const reloadHashList = async () => {
		const { success, code, items, error } = await getItems("HashList");
		if (success) {
			setHashList(items);
		} else if (code === 404) {
			console.log(error);
		} else if (code === 403 || code === 401) {
			await logout();
		}
	};

	const value = {
		ipList,
		setIpList,
		reloadIpList,
		domainList,
		setDomainList,
		reloadDomainList,
		hashList,
		setHashList,
		reloadHashList,
	};

	return (
		<ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
	);
};
