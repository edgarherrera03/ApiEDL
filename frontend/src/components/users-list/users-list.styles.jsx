import styled from "styled-components";
import { backgroundLightDark, backgroundWhite } from "../../assets/_variables";

export const UsersListContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 1000px;
	margin-right: 20px;
	h1 {
		color: ${backgroundWhite};
		font-size: 30px;
		border-bottom: 1px solid ${backgroundLightDark};
		text-align: center;
		padding-bottom: 15px;
		pointer-events: ${(props) => (props.$activated ? "none" : "auto")};
		opacity: ${(props) => (props.$activated ? 0.5 : 1)};
	}
`;

export const UsersInformationContainer = styled.div`
	display: flex;
	flex-direction: column;
	pointer-events: ${(props) => (props.$activated ? "none" : "auto")};
	opacity: ${(props) => (props.$activated ? 0.5 : 1)};
`;
