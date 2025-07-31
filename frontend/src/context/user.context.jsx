import { createContext, useState, useEffect } from "react";
import { tokenVerification } from "../utils/api";
import { logoutAuthUser } from "../utils/api";

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
	isAuthenticated: false,
	setIsAuthenticated: () => null,
	loading: true,
});

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	const logout = async () => {
		setCurrentUser(null);
		setIsAuthenticated(false);
		localStorage.removeItem("user");
		await logoutAuthUser();
	};
	useEffect(() => {
		const verifyToken = async () => {
			const { success } = await tokenVerification();
			if (success) {
				setIsAuthenticated(true);
				const storedUser = JSON.parse(localStorage.getItem("user"));
				setCurrentUser(storedUser);
			} else {
				logout();
			}
			// setLoading(false);
		};
		verifyToken();
	}, []);

	const value = {
		currentUser,
		setCurrentUser,
		isAuthenticated,
		setIsAuthenticated,
		loading,
		logout,
		setLoading,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
