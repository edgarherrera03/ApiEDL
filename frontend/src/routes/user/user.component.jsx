import { UserContainer, UserIdContainer, UserImage } from "./user.styles";
import UserInfo from "../../components/user-info/user-info.component";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
const User = () => {
	const { currentUser } = useContext(UserContext);
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
