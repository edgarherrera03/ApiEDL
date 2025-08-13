export const signInAuthUser = async (signInFields) => {
	try {
		const response = await fetch(`/api/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(signInFields),
			credentials: "include",
		});

		const data = await response.json();
		const code = response.status;
		if (response.ok && data) {
			return {
				success: true,
				message: data.message,
				user: data.user || null,
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

export const logoutAuthUser = async () => {
	try {
		await fetch(`/api/logout`, {
			method: "POST",
			credentials: "include",
		});
	} catch (error) {
		console.error("Error login out:", error);
	}
};

export const tokenVerification = async () => {
	try {
		const response = await fetch(`/api/token-verification`, {
			method: "GET",
			credentials: "include",
		});

		const contentType = response.headers.get("content-type");
		if (!contentType || !contentType.includes("application/json")) {
			throw new Error("Expected JSON, got something else");
		}

		const data = await response.json();
		if (response.ok) {
			return {
				success: true,
				message: data.message || "User token verified",
			};
		} else {
			return {
				success: false,
				error: data.error || "Token invalid or expired",
			};
		}
	} catch (error) {
		console.error("Token verification request failed:", error);
		return { success: false, error: "Request failed" };
	}
};

export const changePasswordRequest = async (username, newPassword) => {
	try {
		const response = await fetch(`/api/modify-password`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ username: username, password: newPassword }),
		});

		const data = await response.json();
		const code = response.status;
		if (response.ok) {
			return {
				success: true,
				message: data.message || "Password changed succesfully",
			};
		} else {
			return {
				success: false,
				error: data.error || "Error changing password",
				code: code,
			};
		}
	} catch (error) {
		return { success: false, error: "Request failed" };
	}
};
