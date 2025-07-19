import styled, { css } from "styled-components";
import Button from "../button/button.component";
import {
	backgroundMediumDark,
	backgroundWhite,
	backgroundLightDark,
	backgroundDark,
} from "../../assets/_variables";

export const IpListContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${backgroundWhite};
	border-radius: 5px;
	width: 1150px;
`;

export const IpListHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	height: 60px;
	position: relative;

	span {
		color: ${backgroundMediumDark};
		font-size: 1.1rem;
		font-weight: bold;
	}
`;

export const FormWrapper = styled.form`
	display: flex;
	align-items: center;
	position: absolute;
	right: 20px;
	transition: transform 0.3s ease, opacity 0.3s ease;
	opacity: 0;
	z-index: -1;

	${({ formVisible }) =>
		formVisible &&
		css`
			opacity: 1;
			z-index: 0;
		`}

	input {
		height: 35px;
		border: 1px solid ${backgroundLightDark};
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		padding: 0 10px;
		font-size: 1rem;
		outline: none;
	}
`;
export const AddIpButton = styled.button`
	height: 35px;
	border: 1px solid ${backgroundDark};
	border-left: none;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	cursor: pointer;
	background-color: ${backgroundDark};
	color: ${backgroundWhite};
	font-weight: 500;
	font-size: 1rem;
	padding: 0 12px;
`;
export const CustomButton = styled(Button)`
	transition: transform 0.3s ease;
	${({ formVisible }) =>
		formVisible &&
		css`
			transform: translateX(-225px);
		`}
`;
