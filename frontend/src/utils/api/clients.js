export const requestClientsList = async () => {
	try {
		const response = await fetch(`/api/clients`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});
		const data = await response.json();
		const code = response.status;
		if (response.ok && data) {
			return {
				success: true,
				message: data.message,
				clients: data.clients || [],
			};
		} else {
			return {
				success: false,
				error: data.error || "Hubo un error al extraer la lista de clientes",
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

export const addClientRequest = async (
	username,
	name,
	usernameToAdd,
	expirationDate
) => {
	try {
		const response = await fetch(`/api/clients/actions/add`, {
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
		});
		const data = await response.json();
		const code = response.status;
		if (response.ok) {
			return {
				success: true,
				message: data.message || "Cliente añadido correctamente",
			};
		} else {
			return {
				success: false,
				error: data.error || "Hubo un error al añadir al cliente",
				code: code,
			};
		}
	} catch (error) {
		return { success: false, error: "Request failed" };
	}
};

export const deleteClientRequest = async (username, usernameToDelete) => {
	try {
		const response = await fetch(`/api/clients/actions/delete`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				username: username,
				usernameToDelete: usernameToDelete,
			}),
		});
		const data = await response.json();
		const code = response.status;
		if (response.ok) {
			return {
				success: true,
				message: data.message || "Cliente eliminado correctamente",
			};
		} else {
			return {
				success: false,
				error: data.error || "Hubo un error al eliminar al cliente",
				code: code,
			};
		}
	} catch (error) {
		return { success: false, error: "Request failed" };
	}
};

export const requestClientByToken = async (token) => {
	try {
		const response = await fetch(`/api/clients/by-token/${token}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});
		const data = await response.json();
		const code = response.status;
		if (response.ok && data) {
			return {
				success: true,
				message: data.message,
				client: data.client || null,
			};
		} else {
			return {
				success: false,
				error: data.error || "Hubo un error al recuperar los datos del cliente",
				code: code,
			};
		}
	} catch (error) {
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
			`/api/clients/by-token/actions/modify-expiration-date/${token}`,
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
		const code = response.status;
		if (response.ok) {
			return {
				success: true,
				message: data.message || "Fecha de expiración modificada correctamente",
			};
		} else {
			return { success: false, error: data.error, code: code };
		}
	} catch (error) {
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
			`/api/clients/by-token/actions/modify-list-limit/${token}`,
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
		const code = response.status;
		if (response.ok) {
			return {
				success: true,
				message: data.message || "Limite de lista modificado correctamente",
			};
		} else {
			return { success: false, error: data.error, code: code };
		}
	} catch (error) {
		return { success: false, error: "Request failed" };
	}
};

export const regenerateApiKeyRequest = async (username, token) => {
	try {
		const response = await fetch(
			`/api/clients/by-token/actions/regenerate-api-key/${token}`,
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
		const code = response.status;
		if (response.ok) {
			return {
				success: true,
				message: data.message || "Api_Key regenerada correctamente",
			};
		} else {
			return { success: false, error: data.error, code: code };
		}
	} catch (error) {
		return { success: false, error: "Request failed" };
	}
};
