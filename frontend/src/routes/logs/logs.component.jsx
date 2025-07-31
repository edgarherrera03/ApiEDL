import ScrollList from "../../components/scroll-list/scroll-list.component";
import InfoList from "../../components/info-list/info-list.component";
import {
	LogsContainer,
	LogsListContainer,
	RefreshButtonContainer,
	RefreshButton,
} from "./logs.styles";
import { useContext, useEffect, useState } from "react";
import { requestLogs } from "../../utils/api";
import { UserContext } from "../../context/user.context";
import Spinner from "../../components/spinner/spinner.component";

const headersList = [
	"Marca de tiempo",
	"Usuario",
	"Accion realizada",
	"Detalles",
];

const ordersList = ["timestamp", "username", "action", "details"];

const Logs = () => {
	const [logs, setLogs] = useState([]);
	const { logout } = useContext(UserContext);

	useEffect(() => {
		const fetchLogs = async () => {
			const { success, logs, error, code } = await requestLogs();
			if (success) {
				setLogs(logs);
			} else if (code === 401 || code === 403) {
				await logout();
			} else {
				console.log(error || "Error al recuperar los logs");
			}
		};
		fetchLogs();
	}, [logout]);

	const reloadLogsList = async () => {
		const { success, logs, error, code } = await requestLogs();
		if (success) {
			setLogs(logs);
		} else if (code === 401 || code === 403) {
			await logout();
		} else {
			console.log(error || "Error al recuperar los logs");
		}
	};
	if (!logs) return <Spinner />;
	return (
		<LogsContainer>
			<h1>Logs</h1>
			<RefreshButtonContainer>
				<RefreshButton>
					<i onClick={reloadLogsList} className="material-icons">
						refresh
					</i>
				</RefreshButton>
			</RefreshButtonContainer>
			<LogsListContainer>
				<InfoList
					headerTitleList={headersList}
					orderedKeys={ordersList}
					infoList={logs}
					height={600}
				/>
			</LogsListContainer>
		</LogsContainer>
	);
};

export default Logs;
