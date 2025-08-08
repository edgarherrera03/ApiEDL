import styled, { css } from "styled-components";
import Button from "../button/button.component";
import {
	backgroundMediumDark,
	backgroundWhite,
	backgroundLightDark,
	backgroundDark,
} from "../../assets/_variables";

export const HashListContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${backgroundWhite};
	border-radius: 5px;
	width: 100%;
`;

export const HashListHeader = styled.div`
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
	transition: transform 0.5s ease, opacity 1s ease;
	opacity: 0;
	z-index: -1;

	${({ $formVisible }) =>
		$formVisible &&
		css`
			opacity: 1;
			z-index: 0;
		`}

	> :first-child {
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
	}
	input,
	select {
		height: 35px;
		box-sizing: border-box;
		min-width: 120px;
		max-width: 180px;
		border: 1px solid ${backgroundLightDark};
		padding: 0 10px;
		font-size: 1rem;
		outline: none;
	}
`;
export const AddHashButton = styled.button`
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
	transition: transform 0.5s ease;
	box-sizing: border-box;
	${({ $formVisible }) =>
		$formVisible &&
		css`
			transform: translateX(-220px);
		`}
`;
