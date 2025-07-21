import styled from "styled-components";
import {
	backgroundDark,
	backgroundLightDark,
	backgroundWhite,
} from "../../assets/_variables";

export const EdlProfilesContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${backgroundWhite};
	border-radius: 5px;
	width: 100%;
`;

export const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	min-height: 60px;
	padding: 0 20px;
	border-bottom: 1px solid ${backgroundLightDark};
	span {
		color: ${backgroundDark};
		font-weight: bold;
		font-size: 1.1rem;
	}
`;

export const EdlProfile = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-height: 60px;
	border-bottom: 1px solid ${backgroundLightDark};
`;

export const EdlLink = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	color: ${backgroundDark};
`;
export const TitleLinkContainer = styled(TitleContainer)`
	border-bottom: none;
	gap: 15px;
`;
export const Logo = styled.div`
	display: flex;
	align-items: center;
`;
export const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 20px 20px 20px;
	justify-content: space-between;
`;

export const Info = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 50px;
	padding: 0 20px;
	gap: 80px;
	span {
		font-weight: bold;
	}
	form {
		display: flex;
		align-items: center;
		input {
			box-sizing: border-box;
			font-size: 1rem;
			padding: 5px 8px;
			height: 100%;
			min-width: 200px;
			border-top-left-radius: 5px;
			border-bottom-left-radius: 5px;
			border: 1px solid ${backgroundDark};
		}
		button {
			height: 100%;
			border: 1px solid ${backgroundDark};
			border-top-right-radius: 5px;
			border-bottom-right-radius: 5px;
			cursor: pointer;
			background-color: ${backgroundDark};
			color: ${backgroundWhite};
			font-weight: 500;
			font-size: 1rem;
			padding: 5px 10px;
			box-sizing: border-box;
			transition: opacity 0.2s ease;
			&:hover {
				opacity: 0.8;
			}
		}
	}
`;
