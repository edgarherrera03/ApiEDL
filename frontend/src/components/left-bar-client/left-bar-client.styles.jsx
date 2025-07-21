import styled from "styled-components";
import {
	backgroundDark,
	backgroundLightDark,
	backgroundWhite,
} from "../../assets/_variables";

export const LeftBarClientContainer = styled.div`
	position: fixed;
	top: 100px;
	display: flex;
	flex-direction: column;
	width: 200px;
	height: calc(100% - 100px);
	background-color: ${backgroundLightDark};
	padding: 70px 15px 0 15px;
	z-index: 1;
`;
export const LeftBarRoute = styled.div`
	display: flex;
	height: 50px;
	background-color: ${(props) =>
		props.$selected ? `${backgroundDark}` : "transparent"};
	border-radius: 10px;
	align-items: center;
	padding-left: 10px;
	cursor: pointer;
	span {
		color: ${(props) =>
			props.$selected ? `${backgroundWhite}` : `${backgroundDark}`};
		font-weight: 600;
	}
`;
