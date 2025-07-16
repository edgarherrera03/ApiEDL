import {
	NavigationContainer,
	// LogoContainer,
	NavLinks,
	NavLink,
	AppTitle,
} from "./navigation.styles";
import { Outlet } from "react-router";
import { UserContext } from "../../context/user.context";
import { useContext } from "react";
import { logoutAuthUser } from "../../utils/flask-backend.utils";

const Navigation = () => {
	const { currentUser, isAuthenticated, setIsAuthenticated, setCurrentUser } =
		useContext(UserContext);

	const handleLogOut = async () => {
		setCurrentUser(null);
		setIsAuthenticated(false);
		localStorage.removeItem("user");
		await logoutAuthUser();
	};
	return (
		<>
			<NavigationContainer>
				{/* <LogoContainer /> */}
				<AppTitle to="/home">ApiEDL</AppTitle>
				{isAuthenticated && (
					<NavLinks>
						<NavLink to="/clientes">Clientes</NavLink>
						<NavLink>Registros</NavLink>
						<NavLink to="/users">Usuarios</NavLink>
						<NavLink>Logs</NavLink>
						<NavLink onClick={handleLogOut}>Salir</NavLink>
						<NavLink>{currentUser["username"]}</NavLink>
					</NavLinks>
				)}
			</NavigationContainer>
			<Outlet />
		</>
	);
};

export default Navigation;
