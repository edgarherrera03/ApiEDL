import styled from "styled-components";
import {
	backgroundMediumDark,
	backgroundLightDark,
	backgroundWhite,
	dangerColor,
	backgroundDark,
} from "../../assets/_variables";

export const ScrollListBarContainer = styled.div`
	height: 300px;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 5px 0;
	background-color: ${backgroundMediumDark};
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	border-top: 1px solid ${backgroundLightDark};
	box-shadow: 0 8px rgba(0, 0, 0, 0.2);

	&::-webkit-scrollbar {
		width: 8px;
	}
	&::-webkit-scrollbar-track {
		background: ${backgroundDark};
		border-radius: 5px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: ${backgroundLightDark};
		border-radius: 5px;
		border: 2px solid ${backgroundDark};
	}
	&::-webkit-scrollbar-thumb:hover {
		background-color: ${backgroundWhite};
	}
`;
export const ScrollListBarItem = styled.div`
	display: flex;
	align-items: center;
	min-height: 40px;
	padding: 0 10px;
	span {
		color: ${backgroundWhite};
		font-size: 1.1rem;
		margin-left: 10px;
	}
`;

export const CustomSupressButton = styled.button`
	height: 25px;
	width: 25px;
	cursor: pointer;
	background-color: transparent;
	border: 2px solid ${dangerColor};
	color: ${dangerColor};
	font-size: 1.3rem;
	font-weight: 900;
	box-shadow: 0 3px rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	padding: 0;
`;
