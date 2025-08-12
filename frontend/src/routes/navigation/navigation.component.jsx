import {
	NavigationContainer,
	NavLinks,
	NavLink,
	AppTitle,
} from "./navigation.styles";
import { Outlet, useLocation } from "react-router";
import { UserContext } from "../../context/user.context";
import { useContext, useEffect, useState } from "react";
import { logoutAuthUser } from "../../utils/api";

const Navigation = () => {
	const { currentUser, isAuthenticated, setIsAuthenticated, setCurrentUser } =
		useContext(UserContext);
	const [activePath, setActivePath] = useState("");
	const location = useLocation();

	useEffect(() => {
		// Extrae el primer segmento del path para usarlo como activePath
		const pathSegment = location.pathname.split("/")[1];
		setActivePath(pathSegment);
	}, [location.pathname]);

	const handleLogOut = async () => {
		setCurrentUser(null);
		setIsAuthenticated(false);
		localStorage.removeItem("user");
		await logoutAuthUser();
	};
	return (
		<>
			<NavigationContainer>
				<AppTitle to="/home">ApiEDL</AppTitle>
				{isAuthenticated && (
					<NavLinks>
						<NavLink to="/dashboard" $active={activePath === "dashboard"}>
							Dashboard
						</NavLink>
						<NavLink to="/clientes" $active={activePath === "clientes"}>
							Clientes
						</NavLink>
						<NavLink to="/registros" $active={activePath === "registros"}>
							Registros
						</NavLink>
						<NavLink to="/users" $active={activePath === "users"}>
							Usuarios
						</NavLink>
						<NavLink to="/logs" $active={activePath === "logs"}>
							Logs
						</NavLink>
						<NavLink onClick={handleLogOut}>Salir</NavLink>
						<NavLink to="/user" $active={activePath === "user"}>
							{currentUser["username"]}
						</NavLink>
					</NavLinks>
				)}
			</NavigationContainer>
			<Outlet />
		</>
	);
};

export default Navigation;
