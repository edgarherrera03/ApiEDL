import styled from "styled-components";
import {
	backgroundDark,
	backgroundMediumDark,
	infoText,
} from "../../assets/_variables";
import FormInput from "../form-input/form-input.component";

export const NewClientWindowContainer = styled.div`
	position: absolute;
	top: 25%;
	left: 38%;
	width: auto;
	height: auto;
	padding: 10px 20px 20px 20px;
	border-radius: 10px;
	box-shadow: 5px 5px 5px 5px rgb(0, 0, 0, 0.2);
	background-color: ${backgroundMediumDark};
	text-align: center;
	border: 1px solid ${backgroundDark};
	span {
		color: ${infoText};
		font-size: 22px;
		font-weight: 500;
	}
	form {
		text-align: left;
	}
`;

export const NewClientFormInput = styled(FormInput)`
	margin-bottom: 0;
`;

export const ButtonsContainer = styled.div`
	display: flex;
	justify-content: right;
	:nth-child(1) {
		margin-right: 10px;
	}
`;
