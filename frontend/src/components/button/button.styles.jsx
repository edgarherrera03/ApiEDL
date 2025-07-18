import styled from "styled-components";
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
	/* min-width: 80px; */
	width: 120px;
	height: 40px;
	letter-spacing: 0.5px;
	line-height: 40px;
	padding: 0 10px 0 10px;
	font-size: 16px;
	background-color: ${backgroundDark};
	color: ${backgroundWhite};
	font-weight: bold;
	border: none;
	cursor: pointer;
	display: flex;
	justify-content: center;
	border-radius: 5px;
	box-shadow: 0px 3px rgb(0, 0, 0, 0.2);
	&:hover {
		background-color: ${backgroundLightDark};
		color: ${backgroundDark};
	}
`;

export const DeleteButton = styled(BaseButton)`
	width: auto;
	height: 30px;
	line-height: 30px;
	font-size: 15px;
	background-color: ${darkColor};
	color: ${dangerColor};
	border: 1px solid ${dangerColor};
	box-shadow: 0 5px rgba(0, 0, 0, 0.2);
	&:hover {
		background-color: ${dangerColor};
		color: ${backgroundWhite};
		box-shadow: 0 5px rgba(10, 10, 10, 10);
	}
`;

export const ModifyButton = styled(DeleteButton)`
	color: ${warningColor};
	border: 1px solid ${warningColor};
	&:hover {
		background-color: ${warningColor};
		color: ${darkColor};
	}
`;

export const AddButton = styled(DeleteButton)`
	position: relative;
	overflow: hidden;
	width: 150px;
	height: 35px;
	align-items: center;
	color: ${greenColor};
	font-size: 16px;
	background-color: ${backgroundDark};
	border: 1px solid ${darkColor};
	z-index: 0;
	transition: color 0.5s ease-in-out; /* ✅ Smooth text transition */

	&:hover {
		background-color: ${backgroundDark};
		box-shadow: none;
		color: ${backgroundDark}; /* ✅ Matches the hover bg color for contrast */
	}

	&::before {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 0%;
		background-color: ${greenColor};
		z-index: -1;
		transition: width 0.5s ease-in-out;
	}

	&:hover::before {
		width: 100%;
	}
`;

export const SeeButton = styled(DeleteButton)`
	color: ${warningColor};
	border: 1px solid ${warningColor};
	&:hover {
		background-color: ${warningColor};
		color: ${darkColor};
	}
`;

export const GenerateButton = styled.button`
	position: relative;
	overflow: hidden;
	width: auto;
	height: 30px;
	letter-spacing: 0.5px;
	line-height: 30px;
	padding: 0 10px;
	font-size: 16px;
	border-radius: 5px;
	font-weight: bold;
	color: ${warningColor};
	background-color: ${darkColor};
	border: 1px solid ${warningColor};
	box-shadow: 0 5px rgba(0, 0, 0, 0.2);
	z-index: 0;
	transition: color 0.5s ease-in-out;

	&:hover {
		color: ${darkColor};
		background-color: ${darkColor};
	}

	&::before {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 0%;
		background-color: ${warningColor};
		z-index: -1;
		transition: width 0.5s ease-in-out;
	}

	&:hover::before {
		width: 100%;
	}
`;
