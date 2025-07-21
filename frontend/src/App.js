import { Routes, Route } from "react-router";
import { useContext } from "react";
import { UserContext } from "./context/user.context";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Home from "./routes/home/home.component";
import Users from "./routes/users/users.component";
import Clients from "./routes/clients/clients.component";
import RequireAuth from "./routes/requireAuth/requireAuth.component";
import ClientDetailPage from "./routes/client-detail-page/client-detail-page.component";
import Logs from "./routes/logs/logs.component";

function App() {
	const { loading } = useContext(UserContext);
	if (loading) return null;
	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Authentication />} />
				<Route
					path="/home"
					element={
						<RequireAuth>
							<Home />
						</RequireAuth>
					}
				/>
				<Route
					path="/users"
					element={
						<RequireAuth>
							<Users />
						</RequireAuth>
					}
				/>
				<Route
					path="/clientes"
					element={
						<RequireAuth>
							<Clients />
						</RequireAuth>
					}
				/>
				<Route
					path="/clientes/:token"
					element={
						<RequireAuth>
							<ClientDetailPage />
						</RequireAuth>
					}
				/>
				<Route
					path="/logs"
					element={
						<RequireAuth>
							<Logs />
						</RequireAuth>
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;
