import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import Spinner from "../../components/spinner/spinner.component";

const RequireAuth = ({ children }) => {
	const { isAuthenticated, loading } = useContext(UserContext);

	if (loading) return <Spinner />;

	if (!isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default RequireAuth;
