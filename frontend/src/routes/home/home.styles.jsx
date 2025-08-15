import styled from "styled-components";
import {
	backgroundDark,
	backgroundWhite,
	greenColor,
	warningColor,
} from "../../assets/_variables";
import WarningSvg from "../../assets/warning.svg?react";
import HelpSvg from "../../assets/help.svg?react";

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
	color: ${backgroundDark};
`;

export const InfoContainer = styled.div`
	height: 130px;
	width: 70%;
	margin-bottom: 20px;
	border-radius: 5px;
	display: flex;
	padding: 0 20px;
	span {
		text-decoration: underline;
		color: ${backgroundWhite};
	}
`;

export const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const InfoTitle = styled.h4`
	font-size: 20px;
	font-weight: 500;
	margin-bottom: 10px;
`;

export const LogoContainer = styled.div`
	height: 100%;
	width: 80px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-right: 25px;
`;

export const WarningLogo = styled(WarningSvg)`
	height: 70px;
`;

export const HelpLogo = styled(HelpSvg)`
	height: 70px;
`;
