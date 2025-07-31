import styled from "styled-components";
import { NavBarHeight, LeftBarClientWidth } from "../../assets/_variables";

export const RegistrosContainer = styled.div`
	position: absolute;
	top: ${NavBarHeight}px;
	width: 100%;
`;
export const RegistrosInformationContainer = styled.div`
	position: absolute;
	left: ${LeftBarClientWidth}px;
	display: flex;
	flex-direction: column;
	padding: 30px 50px;
	gap: 30px;
	width: 80%;
`;
