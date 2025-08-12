import InfoList from "../../components/info-list/info-list.component";
import {
	LogsContainer,
	LogsListContainer,
	RefreshButtonContainer,
	RefreshButton,
} from "./logs.styles";
import { useContext, useEffect, useState } from "react";
import { cleanLogsRequest, requestLogs } from "../../utils/api";
import { UserContext } from "../../context/user.context";
import Spinner from "../../components/spinner/spinner.component";
import Button, {
	BUTTON_TYPE_CLASSES,
} from "../../components/button/button.component";
import CleanLogsWindow from "../../components/clean-logs-window/clean-logs-window.component";

const headersList = [
	"Marca de tiempo",
	"Usuario",
	"Accion realizada",
	"Detalles",
];

const ordersList = ["timestamp", "username", "action", "details"];

const Logs = () => {
	const [logs, setLogs] = useState([]);
	const [openLogsClean, setOpenLogsClean] = useState(false);
	const { currentUser, logout } = useContext(UserContext);

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

	const handleOpenLogsClean = () => {
		setOpenLogsClean(true);
	};
	const handleCloseLogsClean = () => {
		setOpenLogsClean(false);
	};

	const handleCleanLogs = async (cleanDate) => {
		const confirmed = window.confirm(
			`La logs mas antiguos que ${cleanDate} seran eliminados\n\n¿Confirmar?`
		);
		if (!confirmed) return;
		const { success, error, code } = await cleanLogsRequest(
			currentUser.username,
			cleanDate
		);
		if (code === 403 || code === 401) {
			await logout();
		} else if (!success) {
			console.log(error);
		}
	};
	if (!logs) return <Spinner />;
	return (
		<>
			<LogsContainer $activated={openLogsClean}>
				<h1>Logs</h1>
				<RefreshButtonContainer>
					<RefreshButton>
						<i onClick={reloadLogsList} className="material-icons">
							refresh
						</i>
					</RefreshButton>
					<Button
						onClick={handleOpenLogsClean}
						buttonType={BUTTON_TYPE_CLASSES.add}>
						Limpiar logs
					</Button>
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
			{openLogsClean && (
				<CleanLogsWindow
					handleSubmit={handleCleanLogs}
					handleCancel={handleCloseLogsClean}
				/>
			)}
		</>
	);
};

export default Logs;
