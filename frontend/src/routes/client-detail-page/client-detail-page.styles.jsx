import styled from "styled-components";
import {
	backgroundWhite,
	backgroundDark,
	backgroundMediumDark,
} from "../../assets/_variables";

export const ClientDetailPageContainer = styled.div`
	position: absolute;
	top: 100px;
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
`;

export const ClientGeneralInformation = styled.div`
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid ${backgroundMediumDark};
	text-align: center;
	width: 70%;
	padding-bottom: 20px;
	h1 {
		color: ${backgroundDark};
		font-size: 2.5rem;
		margin-bottom: 10px;
	}
	p {
		span {
			font-weight: bold;
		}
		color: ${backgroundMediumDark};
		font-size: 1.2rem;
		margin: 5px 0;
	}
`;
export const ClientInformation = styled.div`
	display: flex;
	justify-content: space-between;
	width: 70%;
	border-bottom: 1px solid ${backgroundDark};
	padding-bottom: 20px;
	margin-top: 20px;
	p {
		color: ${backgroundDark};
		margin: 10px 0;
		font-size: 1rem;

		span {
			font-weight: bold;
		}
	}
`;
export const ApiKeyContainer = styled.div`
	display: flex;
	flex-direction: column;
`;
export const ExpirationDateContainer = styled.div`
	display: flex;
	flex-direction: column;
	form {
		width: 100%;
		display: flex;
		justify-content: space-between;
		height: 35px;
		label {
			width: 55%;
			text-align: center;
			align-content: center;
			border: 1px solid ${backgroundDark};
			height: 100%;
			font-size: 1rem;
			padding: 0 5px;
			color: ${backgroundWhite};
			background-color: ${backgroundDark};
			border-top-left-radius: 5px;
			border-bottom-left-radius: 5px;
		}
		input {
			width: 50%;
			height: 100%;
			border: 1px solid ${backgroundDark};
			padding: 0px 10px;
			font-size: 1.1rem;
		}
		button {
			width: 15%;
			height: 105%;
			border: 1px solid ${backgroundDark};
			border-top-right-radius: 5px;
			border-bottom-right-radius: 5px;
			cursor: pointer;
			background-color: ${backgroundDark};
			color: ${backgroundWhite};
			font-weight: 500;
			font-size: 1rem;
			padding: 0 10px;
		}
	}
`;
export const ActivityLogContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ClientControlContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 70%;
	margin-top: 20px;
	gap: 50px;
`;

export const TitleInformation = styled.span`
	color: ${backgroundMediumDark};
	font-size: 1.1rem;
	font-weight: bold;
`;
