import styled from "styled-components";
import { dangerColor, darkColor, greenColor } from "../../assets/_variables";

export const BlockedIconContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 22px;
	width: 22px;
	border-radius: 50px;
	background-color: ${({ $blocked }) =>
		$blocked ? `${greenColor}` : `${dangerColor}`};
	color: ${darkColor};
`;
