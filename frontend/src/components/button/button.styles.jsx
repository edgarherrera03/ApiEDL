import styled, { css } from "styled-components";
import {
	backgroundDark,
	backgroundLightDark,
	backgroundWhite,
	dangerColor,
	darkColor,
	greenColor,
	warningColor,
} from "../../assets/_variables";

export const BaseButton = styled.button`
	width: 120px;
	height: 40px;
	letter-spacing: 0.5px;
	line-height: 40px;
	padding: 0 10px;
	font-size: 16px;
	font-weight: bold;
	color: ${backgroundWhite};
	background-color: ${backgroundDark};
	border: none;
	border-radius: 5px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	box-shadow: 0px 3px rgba(0, 0, 0, 0.2);
	transition: all 0.3s ease;

	&:hover {
		background-color: ${backgroundLightDark};
		color: ${backgroundDark};
	}
`;

const outlinedStyle = (color) => css`
	width: auto;
	height: 30px;
	line-height: 30px;
	font-size: 15px;
	background-color: ${darkColor};
	color: ${color};
	border: 1px solid ${color};
	box-shadow: 0 5px rgba(0, 0, 0, 0.2);

	&:hover {
		background-color: ${color};
		color: ${backgroundWhite};
		box-shadow: 0 5px rgba(10, 10, 10, 0.5);
	}
`;

const animatedButton = (textColor, bgColor) => css`
	position: relative;
	overflow: hidden;
	height: 35px;
	align-items: center;
	color: ${textColor};
	background-color: ${bgColor};
	border: 1px solid ${darkColor};
	font-size: 16px;
	z-index: 0;
	transition: color 0.5s ease-in-out;
	&:hover {
		background-color: ${bgColor};
		box-shadow: none;
		color: ${bgColor}; // To be covered by background
	}

	&::before {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		width: 0%;
		height: 100%;
		background-color: ${textColor};
		z-index: -1;
		transition: width 0.5s ease-in-out;
	}

	&:hover::before {
		width: 100%;
	}
`;

export const DeleteButton = styled(BaseButton)`
	${outlinedStyle(dangerColor)}
`;

export const ModifyButton = styled(BaseButton)`
	${outlinedStyle(warningColor)}

	&:hover {
		color: ${darkColor};
	}
`;

export const AddButton = styled(BaseButton)`
	width: 150px;

	${animatedButton(greenColor, backgroundDark)}
`;

export const GenerateButton = styled(BaseButton)`
	width: 120px;
	height: 35px;
	line-height: 30px;
	padding: 0 10px;
	box-shadow: none;
	${animatedButton(warningColor, darkColor)}
	&:hover {
		color: ${darkColor};
		background-color: ${darkColor};
	}
`;

export const SeeMoreButton = styled(BaseButton)`
	width: 120px;
	height: 35px;
	line-height: 30px;
	padding: 0 10px;
	box-shadow: none;
	${animatedButton(backgroundWhite, backgroundDark)}

	&:hover {
		color: ${backgroundDark};
		background-color: ${backgroundDark};
	}
`;
