import styled from "styled-components";
import {
	backgroundMediumDark,
	backgroundLightDark,
	backgroundWhite,
	backgroundDark,
	darkColor,
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
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 50px;
	background-color: ${backgroundMediumDark};
	border: 1px solid ${backgroundLightDark};
	span {
		color: ${backgroundWhite};
		font-size: 20px;
		font-weight: 500;
	}
`;
export const InformationContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
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
	display: flex;

	align-items: center;
	width: 100%;
	height: 50px;
	border: 0.1px solid ${darkColor};
	border-right: none;
	padding-left: 20px;

	span {
		color: ${backgroundWhite};
		font-size: 16px;
		font-weight: 500;
	}
`;
