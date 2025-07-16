import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import { tokenVerification } from "../../utils/flask-backend.utils";

const RequireAuth = ({ children }) => {
	const location = useLocation();
	const { isAuthenticated, setIsAuthenticated, loading, setCurrentUser } =
		useContext(UserContext);
	useEffect(() => {
		const logout = () => {
			setCurrentUser(null);
			setIsAuthenticated(false);
			localStorage.removeItem("user");
		};
		const verifyToken = async () => {
			const { success } = await tokenVerification();
			if (success) {
				setIsAuthenticated(true);
				const storedUser = JSON.parse(localStorage.getItem("user"));
				setCurrentUser(storedUser);
			} else {
				logout();
			}
		};
		verifyToken();
	}, [location.pathname, setCurrentUser, setIsAuthenticated]);

	if (loading) return null;
	if (!isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default RequireAuth;
