export const getItems = async (listType) => {
	try {
		const response = await fetch(`/api/items`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				listType: listType,
			}),
		});
		const data = await response.json();
		const code = response.status;
		if (response.ok) {
			return {
				success: true,
				message: data.message,
				items: data.items,
			};
		} else {
			return {
				success: false,
				error: data.error,
				code: code,
			};
		}
	} catch (error) {
		return { success: false, error: error };
	}
};

export const addItemToList = async (
	username,
	clientUsername,
	itemToAdd,
	listType
) => {
	try {
		const response = await fetch(`/api/items/actions/client/add-item-list`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				username: username,
				itemToAdd: itemToAdd,
				listType: listType,
				clientUsername: clientUsername,
			}),
		});
		const data = await response.json();
		const code = response.status;
		if (response.ok) {
			return {
				success: true,
				message: data.message || "Objeto añadido correctamente",
			};
		} else {
			return {
				success: false,
				error: data.error,
				code: code,
			};
		}
	} catch (error) {
		return { success: false, error: "Request failed" };
	}
};

export const registerItem = async (username, itemToAdd) => {
	try {
		const response = await fetch(`/api/items/actions/client/register-item`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				username: username,
				itemToAdd: itemToAdd,
			}),
		});
		const data = await response.json();
		const code = response.status;
		if (response.ok) {
			return {
				success: true,
				message: data.message || "Objeto añadido correctamente",
			};
		} else {
			return {
				success: false,
				error: data.error,
				code: code,
			};
		}
	} catch (error) {
		return { success: false, error: "Request failed" };
	}
};

export const deleteItemFromList = async (
	username,
	clientUsername,
	itemToDelete,
	listType
) => {
	try {
		const response = await fetch(`/api/items/actions/client/delete-item-list`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				username: username,
				itemToDelete: itemToDelete,
				listType: listType,
				clientUsername: clientUsername,
			}),
		});
		const data = await response.json();
		const code = response.status;
		if (response.ok) {
			return {
				success: true,
				message: data.message || "Objeto eliminado correctamente",
			};
		} else {
			return { success: false, error: data.error, code: code };
		}
	} catch (error) {
		return { success: false, error: "Request failed" };
	}
};

export const deleteItem = async (username, itemToDelete, listType) => {
	try {
		const response = await fetch(`/api/items/actions/client/delete-item`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				username: username,
				itemToDelete: itemToDelete,
				listType: listType,
			}),
		});
		const data = await response.json();
		const code = response.status;
		if (response.ok) {
			return {
				success: true,
				message: data.message || "Objeto eliminado correctamente",
			};
		} else {
			return { success: false, error: data.error, code: code };
		}
	} catch (error) {
		return { success: false, error: "Request failed" };
	}
};

export const addCommentToItem = async (username, listType, comment, item) => {
	try {
		const response = await fetch(`/api/items/actions/client/add-comment`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				username: username,
				listType: listType,
				comment: comment,
				item: item,
			}),
		});
		const data = await response.json();
		const code = response.status;
		if (response.ok) {
			return {
				success: true,
				message: data.message,
			};
		} else {
			return { success: false, error: data.error, code: code };
		}
	} catch (error) {
		return { success: false, error: error };
	}
};

export const investigateItem = async (item, itemType) => {
	try {
		const response = await fetch(`/api/items/actions/investigate-item`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				item: item,
				itemType: itemType,
			}),
		});
		const data = await response.json();
		const code = response.status;
		if (response.ok) {
			return {
				success: true,
				message: data.message,
				indicatorDetails: data.indicatorDetails,
			};
		} else {
			return { success: false, error: data.error, code: code };
		}
	} catch (error) {
		return { success: false, error: error };
	}
};

export const modifyItem = async (username, itemToModify) => {
	try {
		const response = await fetch(`/api/items/actions/modify-item`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				username: username,
				itemToModify: itemToModify,
			}),
		});
		const data = await response.json();
		const code = response.status;
		if (response.ok) {
			return {
				success: true,
				message: data.message,
				indicatorDetails: data.indicatorDetails,
			};
		} else {
			return { success: false, error: data.error, code: code };
		}
	} catch (error) {
		return { success: false, error: error };
	}
};
