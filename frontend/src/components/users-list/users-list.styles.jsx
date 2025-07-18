import styled from "styled-components";
import { backgroundDark, backgroundMediumDark } from "../../assets/_variables";

export const UsersListContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
	h1 {
		color: ${backgroundDark};
		font-size: 30px;
		border-bottom: 1px solid ${backgroundMediumDark};
		text-align: center;
		padding-bottom: 15px;
		pointer-events: ${(props) => (props.$activated ? "none" : "auto")};
		opacity: ${(props) => (props.$activated ? 0.5 : 1)};
	}
`;

export const UsersInformationContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	pointer-events: ${(props) => (props.$activated ? "none" : "auto")};
	opacity: ${(props) => (props.$activated ? 0.5 : 1)};
`;
