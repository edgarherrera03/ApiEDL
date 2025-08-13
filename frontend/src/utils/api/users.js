export const requestUsersInformation = async () => {
	try {
		const response = await fetch(`/api/users`, {
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
				message: data.message || "Users information fetched successfully",
				users: data.users || [],
			};
		} else {
			return {
				success: false,
				error: data.error || "Error fetching users information",
				code: code,
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

export const deleteUserRequest = async (username, usernameToDelete) => {
	try {
		const response = await fetch(`/api/users/actions/delete`, {
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
				message: data.message || "Usuario eliminado correctamente",
			};
		} else {
			return { success: false, error: data.error, code: code };
		}
	} catch (error) {
		return { success: false, error: "Request failed" };
	}
};

export const addUserRequest = async (
	username,
	usernameToAdd,
	password,
	role
) => {
	try {
		const response = await fetch(`/api/users/actions/add`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				username: username,
				usernameToAdd: usernameToAdd,
				password: password,
				role: role,
			}),
		});

		const data = await response.json();
		const code = response.status;
		if (response.ok) {
			return {
				success: true,
				message: data.message || "User añadido correctamente",
			};
		} else {
			return { success: false, error: data.error, code: code };
		}
	} catch (error) {
		return { success: false, error: "Request failed" };
	}
};

export const modifyUserRequest = async (
	username,
	password,
	usernameToModify,
	role
) => {
	try {
		const response = await fetch(`/api/users/actions/modify`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				username: username,
				password: password,
				usernameToModify: usernameToModify,
				role: role,
			}),
		});

		const data = await response.json();
		const code = response.status;
		if (response.ok) {
			return {
				success: true,
				message: data.message || "User modificado correctamente",
			};
		} else {
			return { success: false, error: data.error, code: code };
		}
	} catch (error) {
		return { success: false, error: "Request failed" };
	}
};
