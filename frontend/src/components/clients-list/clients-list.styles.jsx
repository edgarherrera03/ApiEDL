import styled from "styled-components";
import { backgroundMediumDark, backgroundDark } from "../../assets/_variables";

export const ClientsListContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 95%;
	pointer-events: ${(props) => (props.$activated ? "none" : "auto")};
	opacity: ${(props) => (props.$activated ? 0.5 : 1)};
`;
export const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	border-bottom: 1px solid ${backgroundMediumDark};
	padding-bottom: 10px;
	margin-bottom: 20px;
	h1 {
		color: ${backgroundDark};
		font-size: 30px;
		text-align: center;
	}
`;
