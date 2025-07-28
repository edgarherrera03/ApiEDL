import styled from "styled-components";
import {
	NavBarHeight,
	backgroundDark,
	backgroundWhite,
	greenColor,
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

export const RefreshButtonContainer = styled.div`
	display: flex;
	width: 80%;
`;

export const RefreshButton = styled.div`
	display: flex;
	width: 60px;
	height: 30px;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	background-color: transparent;
	border: 3px solid ${greenColor};
	transition: all 0.2s ease-in-out;
	&:hover {
		background-color: ${greenColor};
	}
	i {
		font-size: 30px;
		font-weight: 500;
		color: ${backgroundDark};
		text-align: center;
		cursor: pointer;
		transition: transform 0.3s ease-in-out;
		display: inline-block;
		&:hover {
			transform: rotate(360deg);
		}
	}
`;
