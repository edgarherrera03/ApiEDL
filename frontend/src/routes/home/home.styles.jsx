import styled from "styled-components";
import {
	backgroundWhite,
	greenColor,
	warningColor,
} from "../../assets/_variables";

export const HomeContainer = styled.div`
	position: absolute;
	top: 100px;
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	padding-top: 80px;
	> :nth-child(2) {
		background-color: ${warningColor};
	}
	> :nth-child(3) {
		background-color: ${greenColor};
	}
`;

export const Title = styled.div`
	width: 70%;
	color: ${backgroundWhite};
`;

export const InfoContainer = styled.div`
	height: 130px;
	width: 70%;
	margin-bottom: 20px;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 20px;
	span {
		text-decoration: underline;
		color: ${backgroundWhite};
	}
`;

export const InfoTitle = styled.h4`
	font-size: 20px;
	font-weight: 500;
	margin-bottom: 10px;
`;
