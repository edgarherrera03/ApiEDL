import styled from "styled-components";
import {
	backgroundDark,
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

	&:hover {
		background-color: ${backgroundWhite};
		color: ${backgroundDark};
		border: 1px solid ${backgroundDark};
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
	width: 200px;
	color: ${greenColor};
	border: 1px solid ${greenColor};
	&:hover {
		background-color: ${greenColor};
		color: ${darkColor};
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
