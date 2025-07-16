import { LoginContainer } from "./authentication.styles";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
const Authentication = () => {
	return (
		<>
			<LoginContainer>
				<SignInForm />
			</LoginContainer>
		</>
	);
};

export default Authentication;
