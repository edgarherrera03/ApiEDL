// export const signInAuthUser = async (signInFields) => {
// 	try {
// 		const response = await fetch("http://127.0.0.1:5000/api/login", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(signInFields),
// 			credentials: "include",
// 		});

// 		const data = await response.json();
// 		if (response.ok && data) {
// 			return {
// 				success: true,
// 				message: data.message || "Login successful",
// 				user: data.user || null,
// 			};
// 		} else {
// 			return {
// 				success: false,
// 				error: data.error || "Login failed",
// 			};
// 		}
// 	} catch (error) {
// 		console.error("Error sending login data:", error);
// 		return { success: false, error: "Request failed" };
// 	}
// };

// export const logoutAuthUser = async () => {
// 	try {
// 		await fetch("http://127.0.0.1:5000/api/logout", {
// 			method: "POST",
// 			credentials: "include",
// 		});
// 	} catch (error) {
// 		console.error("Error login out:", error);
// 	}
// };

// export const tokenVerification = async () => {
// 	try {
// 		const response = await fetch(
// 			"http://127.0.0.1:5000/api/token-verification",
// 			{
// 				method: "GET",
// 				credentials: "include",
// 			}
// 		);

// 		const contentType = response.headers.get("content-type");
// 		if (!contentType || !contentType.includes("application/json")) {
// 			throw new Error("Expected JSON, got something else");
// 		}

// 		const data = await response.json();
// 		if (response.ok) {
// 			return {
// 				success: true,
// 				message: data.message || "User token verified",
// 			};
// 		} else {
// 			return {
// 				success: false,
// 				error: data.error || "Token invalid or expired",
// 			};
// 		}
// 	} catch (error) {
// 		console.error("Token verification request failed:", error);
// 		return { success: false, error: "Request failed" };
// 	}
// };

// export const requestUsersInformation = async () => {
// 	try {
// 		const response = await fetch("http://127.0.0.1:5000/api/users", {
// 			method: "GET",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			credentials: "include",
// 		});

// 		const data = await response.json();
// 		if (response.ok && data) {
// 			return {
// 				success: true,
// 				message: data.message || "Users information fetched successfully",
// 				users: data.users || [],
// 			};
// 		} else {
// 			return {
// 				success: false,
// 				error: data.error || "Error fetching users information",
// 			};
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		return {
// 			success: false,
// 			error: "Request failed",
// 		};
// 	}
// };

// export const changePasswordRequest = async (username, newPassword) => {
// 	try {
// 		const response = await fetch("http://127.0.0.1:5000/api/users", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			credentials: "include",
// 			body: JSON.stringify({ username: username, password: newPassword }),
// 		});

// 		const data = await response.json();

// 		if (response.ok) {
// 			return {
// 				success: true,
// 				message: data.message || "Password changed succesfully",
// 			};
// 		} else {
// 			return {
// 				success: false,
// 				message: data.message || "Error changing password",
// 			};
// 		}
// 	} catch (error) {
// 		console.error("Change password request failed:", error);
// 		return { success: false, error: "Request failed" };
// 	}
// };

// export const deleteUserRequest = async (username) => {
// 	try {
// 		const response = await fetch("http://127.0.0.1:5000/api/actions/delete", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			credentials: "include",
// 			body: JSON.stringify({ username: username }),
// 		});

// 		const data = await response.json();
// 		if (response.ok) {
// 			return {
// 				success: true,
// 				message: data.message || "User deleted successfully",
// 			};
// 		} else {
// 			return { success: false, error: data.error || "An error occurred" };
// 		}
// 	} catch (error) {
// 		console.error("Delete request failed:", error);
// 		return { success: false, error: "Request failed" };
// 	}
// };

// export const addUserRequest = async (username, password, role) => {
// 	try {
// 		const response = await fetch("http://127.0.0.1:5000/api/actions/add-user", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			credentials: "include",
// 			body: JSON.stringify({
// 				username: username,
// 				password: password,
// 				role: role,
// 			}),
// 		});

// 		const data = await response.json();
// 		if (response.ok) {
// 			return {
// 				success: true,
// 				message: data.message || "User added successfully",
// 			};
// 		} else {
// 			return { success: false, error: data.error || "An error occurred" };
// 		}
// 	} catch (error) {
// 		console.error("Add request failed:", error);
// 		return { success: false, error: "Request failed" };
// 	}
// };

// export const modifyUserRequest = async (
// 	username,
// 	password,
// 	usernameToModify,
// 	role
// ) => {
// 	try {
// 		const response = await fetch("http://127.0.0.1:5000/api/actions/modify", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			credentials: "include",
// 			body: JSON.stringify({
// 				username: username,
// 				password: password,
// 				usernameToModify: usernameToModify,
// 				role: role,
// 			}),
// 		});

// 		const data = await response.json();
// 		if (response.ok) {
// 			return {
// 				success: true,
// 				message: data.message || "User modified successfully",
// 			};
// 		} else {
// 			return { success: false, error: data.error || "An error occurred" };
// 		}
// 	} catch (error) {
// 		console.error("Modify request failed:", error);
// 		return { success: false, error: "Request failed" };
// 	}
// };

// export const requestClientsList = async () => {
// 	try {
// 		const response = await fetch("http://127.0.1:5000/api/clients", {
// 			method: "GET",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			credentials: "include",
// 		});
// 		const data = await response.json();
// 		if (response.ok && data) {
// 			return {
// 				success: true,
// 				message: data.message || "Clients Fetched succesfully",
// 				clients: data.clients || [],
// 			};
// 		} else {
// 			return {
// 				success: false,
// 				error: data.error || "Error fetching clients list",
// 			};
// 		}
// 	} catch (error) {
// 		console.error("Error fetching clients list:", error);
// 		return {
// 			success: false,
// 			error: "Request failed",
// 		};
// 	}
// };

// export const addClientRequest = async (name, username, expirationDate) => {
// 	try {
// 		const response = await fetch("http://127.0.1:5000/api/actions/add-client", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			credentials: "include",
// 			body: JSON.stringify({
// 				name: name,
// 				username: username,
// 				expirationDate: expirationDate,
// 			}),
// 		});
// 		const data = await response.json();
// 		if (response.ok) {
// 			return {
// 				success: true,
// 				message: data.message || "Client added successfully",
// 			};
// 		} else {
// 			return {
// 				success: false,
// 				error: data.error || "An error occurred",
// 			};
// 		}
// 	} catch (error) {
// 		console.error("Add client request failed:", error);
// 		return { success: false, error: "Request failed" };
// 	}
// };

// export const requestClientByToken = async (token) => {
// 	try {
// 		const response = await fetch(
// 			`http://127.0.1:5000/api/client/by-token/${token}`,
// 			{
// 				method: "GET",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				credentials: "include",
// 			}
// 		);
// 		const data = await response.json();
// 		if (response.ok && data) {
// 			return {
// 				success: true,
// 				message: data.message || "Client fetched successfully",
// 				client: data.client || null,
// 			};
// 		} else {
// 			return {
// 				success: false,
// 				error: data.error || "Error fetching client by token",
// 			};
// 		}
// 	} catch (error) {
// 		console.error("Error fetching client by token:", error);
// 		return { success: false, error: "Request failed" };
// 	}
// };

// export const addIpAddressRequest = async (token, ipAddress) => {
// 	try {
// 		const response = await fetch(
// 			`http://127.0.1:5000/api/actions/client/add-ip/${token}`,
// 			{
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				credentials: "include",
// 				body: JSON.stringify({ ipAddress: ipAddress }),
// 			}
// 		);
// 		const data = await response.json();
// 		if (response.ok) {
// 			return {
// 				success: true,
// 				message: data.message || "IP address added successfully",
// 			};
// 		} else {
// 			return { success: false, error: data.error || "An error occurred" };
// 		}
// 	} catch (error) {
// 		console.error("Add IP address request failed:", error);
// 		return { success: false, error: "Request failed" };
// 	}
// };

// export const deleteIpAddressRequest = async (token, ipAddress) => {
// 	try {
// 		const response = await fetch(
// 			`http://127.0.1:5000/api/actions/client/delete-ip/${token}`,
// 			{
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				credentials: "include",
// 				body: JSON.stringify({ ipAddress: ipAddress }),
// 			}
// 		);
// 		const data = await response.json();
// 		if (response.ok) {
// 			return {
// 				success: true,
// 				message: data.message || "IP address deleted successfully",
// 			};
// 		} else {
// 			return { success: false, error: data.error || "An error occurred" };
// 		}
// 	} catch (error) {
// 		console.error("Delete IP address request failed:", error);
// 		return { success: false, error: "Request failed" };
// 	}
// };

// export const addIpWhiteListRequest = async (token, ipAddress) => {
// 	try {
// 		const response = await fetch(
// 			`http://127.0.1:5000/api/actions/client/add-ip-white-list/${token}`,
// 			{
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				credentials: "include",
// 				body: JSON.stringify({ ipAddress: ipAddress }),
// 			}
// 		);
// 		const data = await response.json();
// 		if (response.ok) {
// 			return {
// 				success: true,
// 				message: data.message || "IP address added to whitelist successfully",
// 			};
// 		} else {
// 			return { success: false, error: data.error || "An error occurred" };
// 		}
// 	} catch (error) {
// 		console.error("Add IP whitelist request failed:", error);
// 		return { success: false, error: "Request failed" };
// 	}
// };

// export const deleteIpWhiteListRequest = async (token, ipAddress) => {
// 	try {
// 		const response = await fetch(
// 			`http://127.0.1:5000/api/actions/client/delete-ip-white-list/${token}`,
// 			{
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				credentials: "include",
// 				body: JSON.stringify({ ipAddress: ipAddress }),
// 			}
// 		);
// 		const data = await response.json();
// 		if (response.ok) {
// 			return {
// 				success: true,
// 				message:
// 					data.message || "IP address removed from whitelist successfully",
// 			};
// 		} else {
// 			return { success: false, error: data.error || "An error occurred" };
// 		}
// 	} catch (error) {
// 		console.error("Delete IP whitelist request failed:", error);
// 		return { success: false, error: "Request failed" };
// 	}
// };

// export const addWebsiteRequest = async (token, website) => {
// 	try {
// 		const response = await fetch(
// 			`http://127.0.1:5000/api/actions/client/add-website/${token}`,
// 			{
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				credentials: "include",
// 				body: JSON.stringify({ website: website }),
// 			}
// 		);
// 		const data = await response.json();
// 		if (response.ok) {
// 			return {
// 				success: true,
// 				message: data.message || "Website added successfully",
// 			};
// 		} else {
// 			return { success: false, error: data.error || "An error occurred" };
// 		}
// 	} catch (error) {
// 		console.error("Add website request failed:", error);
// 		return { success: false, error: "Request failed" };
// 	}
// };

// export const deleteWebsiteRequest = async (token, website) => {
// 	try {
// 		const response = await fetch(
// 			`http://127.0.1:5000/api/actions/client/delete-website/${token}`,
// 			{
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				credentials: "include",
// 				body: JSON.stringify({ website: website }),
// 			}
// 		);
// 		const data = await response.json();
// 		if (response.ok) {
// 			return {
// 				success: true,
// 				message: data.message || "Website deleted successfully",
// 			};
// 		} else {
// 			return { success: false, error: data.error || "An error occurred" };
// 		}
// 	} catch (error) {
// 		console.error("Delete website request failed:", error);
// 		return { success: false, error: "Request failed" };
// 	}
// };

// export const modifyExpirationDateRequest = async (token, newExpirationDate) => {
// 	try {
// 		const response = await fetch(
// 			`http://127.0.1:5000/api/actions/client/modify-expiration-date/${token}`,
// 			{
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				credentials: "include",
// 				body: JSON.stringify({ expirationDate: newExpirationDate }),
// 			}
// 		);
// 		const data = await response.json();
// 		if (response.ok) {
// 			return {
// 				success: true,
// 				message: data.message || "Expiration date modified successfully",
// 			};
// 		} else {
// 			return { success: false, error: data.error || "An error occurred" };
// 		}
// 	} catch (error) {
// 		console.error("Modify expiration date request failed:", error);
// 		return { success: false, error: "Request failed" };
// 	}
// };
