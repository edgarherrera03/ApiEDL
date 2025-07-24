import ScrollList from "../../components/scroll-list/scroll-list.component";
import { LogsContainer, LogsListContainer } from "./logs.styles";
import { useEffect, useState } from "react";
import { requestLogs } from "../../utils/api";

const headersList = [
	"Marca de tiempo",
	"Usuario",
	"Accion realizada",
	"Detalles",
];

const ordersList = ["timestamp", "username", "action", "details"];

const Logs = () => {
	const [logs, setLogs] = useState([]);

	useEffect(() => {
		const fetchLogs = async () => {
			const response = await requestLogs();
			if (response.success) {
				setLogs(response.logs);
			} else {
				console.log(response.error || "Error fetching logs information");
			}
		};

		fetchLogs();
	}, []);

	const reloadLogsList = async () => {
		const response = await requestLogs();
		if (response.success) {
			setLogs(response.logs);
		} else {
			console.log(response.error || "Error reloading logs list");
		}
	};
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
