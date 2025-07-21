import ScrollList from "../../components/scroll-list/scroll-list.component";
import InfoList from "../../components/info-list/info-list.component";
import { LogsContainer, LogsListContainer } from "./logs.styles";

const headersList = [
	"Marca de tiempo",
	"Usuario",
	"Accion realizada",
	"Detalles",
];

const ordersList = ["timestamp", "username", "action", "details"];

const logs = [
	{
		timestamp: "2025-07-21T14:10:05Z",
		username: "alice",
		action: "LOGIN",
		details: "User logged in successfully",
	},
	{
		timestamp: "2025-07-21T14:12:32Z",
		username: "alice",
		action: "ADD_IP",
		details: "Added IP 192.168.1.12 to allowlist",
	},
	{
		timestamp: "2025-07-21T14:15:48Z",
		username: "bob",
		action: "DELETE_DOMAIN",
		details: "Removed domain example.org from blocklist",
	},
	{
		timestamp: "2025-07-21T14:17:25Z",
		username: "carol",
		action: "VIEW_LOGS",
		details: "Viewed user logs for bob",
	},
	{
		timestamp: "2025-07-21T14:20:19Z",
		username: "bob",
		action: "ADD_HASH",
		details: "Added hash b1946ac92492d2347c6235b4d2611184 to monitoring list",
	},
	{
		timestamp: "2025-07-21T14:23:10Z",
		username: "alice",
		action: "LOGOUT",
		details: "User logged out",
	},
	{
		timestamp: "2025-07-21T14:25:55Z",
		username: "carol",
		action: "MODIFY_USER",
		details: "Changed permissions for user bob",
	},
	{
		timestamp: "2025-07-21T14:30:40Z",
		username: "bob",
		action: "DOWNLOAD_REPORT",
		details: "Downloaded full activity report as CSV",
	},
	{
		timestamp: "2025-07-21T14:33:01Z",
		username: "carol",
		action: "ADD_DOMAIN",
		details: "Added domain suspicious.net to watchlist",
	},
	{
		timestamp: "2025-07-21T14:35:18Z",
		username: "alice",
		action: "RESET_PASSWORD",
		details: "Reset password for user carol",
	},
];

const Logs = () => {
	return (
		<LogsContainer>
			<h1>Logs</h1>
			<LogsListContainer>
				<ScrollList
					headersList={headersList}
					ordersList={ordersList}
					itemList={logs}
					height={600}
				/>
			</LogsListContainer>
		</LogsContainer>
	);
};

export default Logs;
