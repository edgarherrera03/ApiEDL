import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import Spinner from "../../components/spinner/spinner.component";

const RequireAuth = ({ children }) => {
	const { isAuthenticated, loading, verifyToken } = useContext(UserContext);

	useEffect(() => {
		verifyToken(); // first check
		const interval = setInterval(() => {
			verifyToken();
		}, 60_000);
		return () => clearInterval(interval);
	}, []);

	if (loading) return <Spinner />;

	if (!isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default RequireAuth;
