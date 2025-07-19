export const requestClientsList = async () => {
	try {
		const response = await fetch("http://127.0.0.1:5000/api/clients", {
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
				message: data.message || "Clients Fetched succesfully",
				clients: data.clients || [],
			};
		} else {
			return {
				success: false,
				error: data.error || "Error fetching clients list",
			};
		}
	} catch (error) {
		console.error("Error fetching clients list:", error);
		return {
			success: false,
			error: "Request failed",
		};
	}
};

export const addClientRequest = async (name, username, expirationDate) => {
	try {
		const response = await fetch(
			"http://127.0.0.1:5000/api/clients/actions/add",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					name: name,
					username: username,
					expirationDate: expirationDate,
				}),
			}
		);
		const data = await response.json();
		if (response.ok) {
			return {
				success: true,
				message: data.message || "Client added successfully",
			};
		} else {
			return {
				success: false,
				error: data.error || "An error occurred",
			};
		}
	} catch (error) {
		console.error("Add client request failed:", error);
		return { success: false, error: "Request failed" };
	}
};

export const requestClientByToken = async (token) => {
	try {
		const response = await fetch(
			`http://127.0.0.1:5000/api/clients/by-token/${token}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			}
		);
		const data = await response.json();
		if (response.ok && data) {
			return {
				success: true,
				message: data.message || "Client fetched successfully",
				client: data.client || null,
			};
		} else {
			return {
				success: false,
				error: data.error || "Error fetching client by token",
			};
		}
	} catch (error) {
		console.error("Error fetching client by token:", error);
		return { success: false, error: "Request failed" };
	}
};

export const addIpAddressRequest = async (token, ipAddress) => {
	try {
		const response = await fetch(
			`http://127.0.0.1:5000/api/clients/by-token/actions/add-ip/${token}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ ipAddress: ipAddress }),
			}
		);
		const data = await response.json();
		if (response.ok) {
			return {
				success: true,
				message: data.message || "IP address added successfully",
			};
		} else {
			return { success: false, error: data.error || "An error occurred" };
		}
	} catch (error) {
		console.error("Add IP address request failed:", error);
		return { success: false, error: "Request failed" };
	}
};

export const deleteIpAddressRequest = async (token, ipAddress) => {
	try {
		const response = await fetch(
			`http://127.0.0.1:5000/api/clients/by-token/actions/delete-ip/${token}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ ipAddress: ipAddress }),
			}
		);
		const data = await response.json();
		if (response.ok) {
			return {
				success: true,
				message: data.message || "IP address deleted successfully",
			};
		} else {
			return { success: false, error: data.error || "An error occurred" };
		}
	} catch (error) {
		console.error("Delete IP address request failed:", error);
		return { success: false, error: "Request failed" };
	}
};

export const addIpWhiteListRequest = async (token, ipAddress) => {
	try {
		const response = await fetch(
			`http://127.0.0.1:5000/api/clients/by-token/actions/add-ip-white-list/${token}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ ipAddress: ipAddress }),
			}
		);
		const data = await response.json();
		if (response.ok) {
			return {
				success: true,
				message: data.message || "IP address added to whitelist successfully",
			};
		} else {
			return { success: false, error: data.error || "An error occurred" };
		}
	} catch (error) {
		console.error("Add IP whitelist request failed:", error);
		return { success: false, error: "Request failed" };
	}
};

export const deleteIpWhiteListRequest = async (token, ipAddress) => {
	try {
		const response = await fetch(
			`http://127.0.0.1:5000/api/clients/by-token/actions/delete-ip-white-list/${token}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ ipAddress: ipAddress }),
			}
		);
		const data = await response.json();
		if (response.ok) {
			return {
				success: true,
				message:
					data.message || "IP address removed from whitelist successfully",
			};
		} else {
			return { success: false, error: data.error || "An error occurred" };
		}
	} catch (error) {
		console.error("Delete IP whitelist request failed:", error);
		return { success: false, error: "Request failed" };
	}
};

export const addWebsiteRequest = async (token, website) => {
	try {
		const response = await fetch(
			`http://127.0.0.1:5000/api/clients/by-token/actions/add-website/${token}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ website: website }),
			}
		);
		const data = await response.json();
		if (response.ok) {
			return {
				success: true,
				message: data.message || "Website added successfully",
			};
		} else {
			return { success: false, error: data.error || "An error occurred" };
		}
	} catch (error) {
		console.error("Add website request failed:", error);
		return { success: false, error: "Request failed" };
	}
};

export const deleteWebsiteRequest = async (token, website) => {
	try {
		const response = await fetch(
			`http://127.0.0.1:5000/api/clients/by-token/actions/delete-website/${token}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ website: website }),
			}
		);
		const data = await response.json();
		if (response.ok) {
			return {
				success: true,
				message: data.message || "Website deleted successfully",
			};
		} else {
			return { success: false, error: data.error || "An error occurred" };
		}
	} catch (error) {
		console.error("Delete website request failed:", error);
		return { success: false, error: "Request failed" };
	}
};

export const modifyExpirationDateRequest = async (token, newExpirationDate) => {
	try {
		const response = await fetch(
			`http://127.0.0.1:5000/api/clients/by-token/actions/modify-expiration-date/${token}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ expirationDate: newExpirationDate }),
			}
		);
		const data = await response.json();
		if (response.ok) {
			return {
				success: true,
				message: data.message || "Expiration date modified successfully",
			};
		} else {
			return { success: false, error: data.error || "An error occurred" };
		}
	} catch (error) {
		console.error("Modify expiration date request failed:", error);
		return { success: false, error: "Request failed" };
	}
};
