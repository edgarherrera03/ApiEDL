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

export const addClientRequest = async (
	username,
	name,
	usernameToAdd,
	expirationDate
) => {
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
					username: username,
					name: name,
					usernameToAdd: usernameToAdd,
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

export const deleteIpAddressRequest = async (username, token, ipAddress) => {
	try {
		const response = await fetch(
			`http://127.0.0.1:5000/api/clients/by-token/actions/delete-ip/${token}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ username: username, ipAddress: ipAddress }),
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

export const deleteWebsiteRequest = async (username, token, website) => {
	try {
		const response = await fetch(
			`http://127.0.0.1:5000/api/clients/by-token/actions/delete-website/${token}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ username: username, website: website }),
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

export const addItemToList = async (username, token, itemToAdd, listType) => {
	try {
		const response = await fetch(
			`http://127.0.0.1:5000/api/clients/by-token/actions/add-item-list/${token}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					username: username,
					itemToAdd: itemToAdd,
					listType: listType,
				}),
			}
		);
		const data = await response.json();
		if (response.ok) {
			return {
				success: true,
				message: data.message || "Objeto añadido correctamente",
			};
		} else {
			return { success: false, error: data.error || "Hubo un error" };
		}
	} catch (error) {
		console.error("Hubo un error al añadir el objeto:", error);
		return { success: false, error: "Request failed" };
	}
};

export const deleteItemFromList = async (
	username,
	token,
	itemToDelete,
	listType
) => {
	try {
		const response = await fetch(
			`http://127.0.0.1:5000/api/clients/by-token/actions/delete-item-list/${token}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					username: username,
					itemToAdd: itemToDelete,
					listType: listType,
				}),
			}
		);
		const data = await response.json();
		if (response.ok) {
			return {
				success: true,
				message: data.message || "Objeto eliminado correctamente",
			};
		} else {
			return { success: false, error: data.error || "Hubo un error" };
		}
	} catch (error) {
		console.error("Hubo un error al eliminar el objeto:", error);
		return { success: false, error: "Request failed" };
	}
};

export const modifyExpirationDateRequest = async (
	username,
	token,
	newExpirationDate
) => {
	try {
		const response = await fetch(
			`http://127.0.0.1:5000/api/clients/by-token/actions/modify-expiration-date/${token}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					username: username,
					expirationDate: newExpirationDate,
				}),
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

export const modifyListLimitRequest = async (
	username,
	token,
	newListLimit,
	listType
) => {
	try {
		const response = await fetch(
			`http://127.0.0.1:5000/api/clients/by-token/actions/modify-list-limit/${token}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					username: username,
					newListLimit: newListLimit,
					listType: listType,
				}),
			}
		);
		const data = await response.json();
		if (response.ok) {
			return {
				success: true,
				message: data.message || "List limit modified successfully",
			};
		} else {
			return { success: false, error: data.error || "An error occurred" };
		}
	} catch (error) {
		console.error("Modify list limit request failed:", error);
		return { success: false, error: "Request failed" };
	}
};

export const regenerateApiKeyRequest = async (username, token) => {
	try {
		const response = await fetch(
			`http://127.0.0.1:5000/api/clients/by-token/actions/regenerate-api-key/${token}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					username: username,
				}),
			}
		);
		const data = await response.json();
		if (response.ok) {
			return {
				success: true,
				message: data.message || "Api_Key regenerated successfully",
			};
		} else {
			return { success: false, error: data.error || "An error occurred" };
		}
	} catch (error) {
		console.error("Regenerate Api_Key request failed:", error);
		return { success: false, error: "Request failed" };
	}
};
