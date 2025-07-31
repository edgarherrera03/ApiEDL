import styled from "styled-components";
import {
	backgroundMediumDark,
	backgroundLightDark,
	backgroundWhite,
	backgroundDark,
	darkColor,
	infoText,
} from "../../assets/_variables";

export const InfoListContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	pointer-events: ${(props) => (props.$activated ? "none" : "auto")};
	opacity: ${(props) => (props.$activated ? 0.5 : 1)};
`;
export const InfoListHeader = styled.div`
	display: flex;
	width: 100%;
`;
export const HeaderTitle = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 50px;
	background-color: ${backgroundMediumDark};
	border: 1px solid ${backgroundLightDark};
	span {
		color: ${backgroundWhite};
		font-size: 20px;
		font-weight: 500;
		word-break: break-word;
	}
`;
export const InformationContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: ${({ $height }) => ($height ? `${$height}px` : "auto")};
	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 3px;
	}

	&::-webkit-scrollbar-track {
		background: ${backgroundDark}; /* fondo de la barra */
		border-radius: 10px;
	}

	&::-webkit-scrollbar-thumb {
		background: ${backgroundMediumDark}; /* color de la barra */
		border-radius: 10px;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: ${infoText}; /* color al hacer hover */
	}

	> :nth-child(odd) {
		background-color: ${backgroundDark};
		&:hover {
			background-color: #4a4a4a;
		}
	}

	> :nth-child(even) {
		background-color: ${backgroundMediumDark};
		&:hover {
			background-color: #4a4a4a;
		}
	}
`;
export const InfoItem = styled.div`
	display: flex;
	width: 100%;

	> :last-child {
		border-right: 0.1px solid ${darkColor};
		justify-content: space-evenly;
	}
`;

export const Info = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	min-height: 50px;
	border: 1px solid ${darkColor};
	border-right: none;
	padding: 10px 0 10px 20px;
	box-sizing: border-box;

	span {
		color: ${backgroundWhite};
		font-size: 16px;
		font-weight: 500;
		word-break: break-word;
	}
`;
