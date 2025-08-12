import { serverIP, serverPort } from "../../assets/_variables";
export const requestLogs = async () => {
	try {
		const response = await fetch(
			`http://${serverIP}:${serverPort}/api/utils/logs`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			}
		);

		const data = await response.json();
		const code = response.status;
		if (response.ok && data) {
			return {
				success: true,
				message: data.message || "Logs recuperados correctamente",
				logs: data.logs || [],
			};
		} else {
			return {
				success: false,
				error: data.error || "Hubo un error al recuperar los logs",
				code: code,
			};
		}
	} catch (error) {
		return {
			success: false,
			error: "Request failed",
		};
	}
};

export const cleanLogsRequest = async (username, cleanDate) => {
	try {
		const response = await fetch(
			`http://${serverIP}:${serverPort}/api/utils/logs/clean`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					username: username,
					cleanDate: cleanDate,
				}),
			}
		);

		const data = await response.json();
		const code = response.status;
		if (response.ok && data) {
			return {
				success: true,
				message: data.message,
			};
		} else {
			return {
				success: false,
				error: data.error,
				code: code,
			};
		}
	} catch (error) {
		return {
			success: false,
			error: "Request failed",
		};
	}
};
