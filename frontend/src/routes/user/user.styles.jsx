import styled from "styled-components";
import { NavBarHeight, backgroundDark } from "../../assets/_variables";
import { ReactComponent as UserSvg } from "../../assets/user.svg";

export const UserContainer = styled.div`
	position: absolute;
	top: ${NavBarHeight}px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: 50px 0;
	h1 {
		color: ${backgroundDark};
		font-size: 30px;
	}
`;

export const UserImage = styled(UserSvg)`
	width: 200px;
	height: 200px;
`;

export const UserIdContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 30px;
	width: 60%;
	border-bottom: 1px solid ${backgroundDark};
	margin-bottom: 20px;
`;
