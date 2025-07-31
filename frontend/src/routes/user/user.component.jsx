import { UserContainer, UserIdContainer, UserImage } from "./user.styles";
import UserInfo from "../../components/user-info/user-info.component";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import Spinner from "../../components/spinner/spinner.component";

const User = () => {
	const { currentUser } = useContext(UserContext);
	if (!currentUser) return <Spinner />;

	return (
		<UserContainer>
			<UserIdContainer>
				<UserImage />
				<h1>{currentUser["username"]}</h1>
			</UserIdContainer>
			<UserInfo />
		</UserContainer>
	);
};

export default User;
