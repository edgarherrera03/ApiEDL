import styled, { css } from "styled-components";
import {
	backgroundDark,
	backgroundLightDark,
	backgroundWhite,
} from "../../assets/_variables";

const shrinkLabelStyles = css`
	font-size: 14px;
	color: ${backgroundLightDark};
`;

export const Group = styled.div`
	position: relative;
	margin: 15px 0;
	input[type="password"] {
		letter-spacing: 0.3em;
	}
`;

export const FormInputLabel = styled.label`
	color: ${backgroundWhite};
	font-size: 16px;
	font-weight: normal;
	position: absolute;
	pointer-events: none;
	left: 5px;
	top: 0px;
	transition: 300ms ease all;

	${({ shrink }) => shrink && shrinkLabelStyles};
`;

export const Input = styled.input`
	background: none;
	background-color: ${backgroundWhite};
	color: ${backgroundDark};
	font-size: 18px;
	padding: 10px 15px 10px 15px;
	width: 300px;
	border: none;
	border-radius: 5px;
	margin: 25px 0;

	&:focus {
		outline: none;
	}

	&:focus ~ ${FormInputLabel} {
		${shrinkLabelStyles}
	}
`;
