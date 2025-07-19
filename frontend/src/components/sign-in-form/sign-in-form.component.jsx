import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FormContainer } from "./sign-in-form.styles";
import { signInAuthUser } from "../../utils/api";
import { UserContext } from "../../context/user.context";
import { useContext } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultSignInField = {
	usuario: "",
	password: "",
};

const SignInForm = () => {
	const [signInFields, setSignInFields] = useState(defaultSignInField);
	const { usuario, password } = signInFields;
	const { isAuthenticated, setIsAuthenticated, setCurrentUser } =
		useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/home");
		}
	}, [isAuthenticated, navigate]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setSignInFields({ ...signInFields, [name]: value });
	};

	const resetSignInFields = () => {
		setSignInFields(defaultSignInField);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await signInAuthUser(signInFields);
		if (response.success) {
			const user = response.user;
			localStorage.setItem("user", JSON.stringify(user));
			setIsAuthenticated(true);
			setCurrentUser(user);
		} else {
			setCurrentUser(null);
			localStorage.removeItem("user");
			setIsAuthenticated(false);
			alert(response.error || "Login failed");
		}
		resetSignInFields();
	};
	return (
		<FormContainer>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<FormInput
					name="usuario"
					type="text"
					label="Usuario"
					required
					value={usuario}
					onChange={handleChange}
				/>
				<FormInput
					name="password"
					type="password"
					label="Contraseña"
					required
					value={password}
					onChange={handleChange}
				/>
				<Button type="submit">Ingresar</Button>
			</form>
		</FormContainer>
	);
};
export default SignInForm;
