import styled from "styled-components";
import {
	NavBarHeight,
	backgroundDark,
	backgroundLightDark,
	backgroundMediumDark,
	backgroundWhite,
} from "../../assets/_variables";

export const LogsContainer = styled.div`
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
		text-align: center;
		padding-bottom: 15px;
		width: 80%;
		border-bottom: 1px solid ${backgroundDark};
	}
`;
export const LogsListContainer = styled.div`
	background-color: ${backgroundWhite};
	border-radius: 5px;
	width: 80%;
`;
