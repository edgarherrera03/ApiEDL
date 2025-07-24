export const requestLogs = async () => {
	try {
		const response = await fetch("http://127.0.0.1:5000/api/utils/logs", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		const data = await response.json();
		if (response.ok && data) {
			return {
				success: true,
				message: data.message || "Logs information fetched successfully",
				logs: data.logs || [],
			};
		} else {
			return {
				success: false,
				error: data.error || "Error fetching logs information",
			};
		}
	} catch (error) {
		console.log(error);
		return {
			success: false,
			error: "Request failed",
		};
	}
};
