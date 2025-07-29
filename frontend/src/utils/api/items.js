export const getItems = async (listType) => {
	try {
		const response = await fetch("http://127.0.0.1:5000/api/items", {
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
		const response = await fetch(
			`http://127.0.0.1:5000/api/items/actions/client/add-item-list`,
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
					clientUsername: clientUsername,
				}),
			}
		);
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
		const response = await fetch(
			`http://127.0.0.1:5000/api/items/actions/client/delete-item-list`,
			{
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
			}
		);
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
		console.error("Hubo un error al eliminar el objeto:", error);
		return { success: false, error: "Request failed" };
	}
};
