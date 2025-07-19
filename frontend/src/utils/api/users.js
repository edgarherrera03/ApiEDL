export const requestUsersInformation = async () => {
	try {
		const response = await fetch("http://127.0.0.1:5000/api/users", {
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
				message: data.message || "Users information fetched successfully",
				users: data.users || [],
			};
		} else {
			return {
				success: false,
				error: data.error || "Error fetching users information",
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

export const deleteUserRequest = async (username) => {
	try {
		const response = await fetch("http://127.0.0.1:5000/api/actions/delete", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ username: username }),
		});

		const data = await response.json();
		if (response.ok) {
			return {
				success: true,
				message: data.message || "User deleted successfully",
			};
		} else {
			return { success: false, error: data.error || "An error occurred" };
		}
	} catch (error) {
		console.error("Delete request failed:", error);
		return { success: false, error: "Request failed" };
	}
};

export const addUserRequest = async (username, password, role) => {
	try {
		const response = await fetch("http://127.0.0.1:5000/api/actions/add-user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				username: username,
				password: password,
				role: role,
			}),
		});

		const data = await response.json();
		if (response.ok) {
			return {
				success: true,
				message: data.message || "User added successfully",
			};
		} else {
			return { success: false, error: data.error || "An error occurred" };
		}
	} catch (error) {
		console.error("Add request failed:", error);
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
		const response = await fetch("http://127.0.0.1:5000/api/actions/modify", {
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
		if (response.ok) {
			return {
				success: true,
				message: data.message || "User modified successfully",
			};
		} else {
			return { success: false, error: data.error || "An error occurred" };
		}
	} catch (error) {
		console.error("Modify request failed:", error);
		return { success: false, error: "Request failed" };
	}
};
