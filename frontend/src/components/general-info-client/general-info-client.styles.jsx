import styled from "styled-components";
import {
	backgroundDark,
	backgroundMediumDark,
	backgroundWhite,
	backgroundLightDark,
} from "../../assets/_variables";

export const ClientBaseInformation = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${backgroundWhite};
	border-radius: 5px;
	width: 100%;
`;

export const ApiKeyContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 40px;
	padding: 0 20px;
	height: 60px;
	border-bottom: 1px solid ${backgroundLightDark};
`;

export const TitleInformation = styled.span`
	color: ${backgroundMediumDark};
	span {
		font-size: 1.1rem;
		font-weight: bold;
	}
	display: flex;
	align-items: center;
	gap: 80px;
`;

export const ExpirationDateContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 20px;
	height: 60px;
	border-bottom: 1px solid ${backgroundLightDark};
	> :first-child {
		border-right: 1px solid ${backgroundLightDark};
	}
	> :last-child {
		padding-left: 30px;
	}
	form {
		width: 100%;
		display: flex;
		align-items: center;
	}
`;

export const DatesContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 20px;
	height: 60px;
	> :first-child {
		border-right: 1px solid ${backgroundLightDark};
	}
	> :last-child {
		padding-left: 30px;
	}
`;

export const DateContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	gap: 30px;
	p {
		color: ${backgroundDark};
		margin: 10px 0;
		font-size: 1rem;
	}
	span {
		color: ${backgroundDark};
		font-weight: bold;
		font-size: 1.1rem;
	}
	input {
		width: 50%;
		height: 100%;
		border: 1px solid ${backgroundLightDark};
		padding: 5px 10px;
		border-radius: 5px;
		font-size: 1.1rem;
	}
	button {
		height: 100%;
		border: 1px solid ${backgroundDark};
		border-radius: 5px;
		cursor: pointer;
		background-color: ${backgroundDark};
		color: ${backgroundWhite};
		font-weight: 500;
		font-size: 1rem;
		padding: 5px 10px;

		transition: opacity 0.2s ease;
		&:hover {
			opacity: 0.8;
		}
	}
`;
