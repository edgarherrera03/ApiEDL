import styled from "styled-components";
import {
	NavBarHeight,
	backgroundDark,
	LeftBarClientWidth,
} from "../../assets/_variables";

export const DashboardContainer = styled.div`
	position: absolute;
	top: ${NavBarHeight}px;
	width: 100%;
`;

export const ChartContainer = styled.div`
	position: absolute;
	left: ${LeftBarClientWidth}px;
	display: flex;
	flex-direction: column;
	gap: 30px;
	width: 80%;
	padding: 30px 50px;
`;

export const DashboardTitle = styled.div`
	display: flex;
	h1 {
		color: ${backgroundDark};
		font-size: 2.5rem;
		margin-bottom: 10px;
	}
`;

export const DashboardContent = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	gap: 30px;
`;
