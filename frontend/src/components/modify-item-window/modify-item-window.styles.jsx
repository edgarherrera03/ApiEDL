import styled from "styled-components";
import {
	backgroundWhite,
	backgroundMediumDark,
	backgroundDark,
	infoText,
} from "../../assets/_variables";
import FormInput from "../form-input/form-input.component";

export const ModifyItemWindowContainer = styled.div`
	position: absolute;
	top: 28%;
	left: 28%;
	width: 400px;
	height: auto;
	padding: 10px 20px 20px 20px;
	border-radius: 10px;
	box-shadow: 5px 5px 5px 5px rgb(0, 0, 0, 0.2);
	background-color: ${backgroundMediumDark};
	text-align: center;
	border: 1px solid ${backgroundDark};
	z-index: 3;
	span {
		color: ${infoText};
		font-size: 22px;
		font-weight: 500;
	}
	form {
		text-align: left;
	}
`;

export const ElementLabel = styled.p`
	color: ${backgroundWhite};
	font-weight: 600;
	margin-bottom: 20px;
	overflow-wrap: break-word;
	word-break: break-word;
	width: 100%;
	font-size: 17px;
`;

export const RatingInput = styled(FormInput)`
	margin-bottom: 15px;
	/* width: 100%; */
`;

export const SelectLabel = styled.label`
	font-size: 16px;
	color: ${backgroundWhite};
	display: flex;
	flex-direction: column;
	text-align: left;
`;
export const Selector = styled.select`
	width: 100%;
	padding: 8px;
	margin: 8px 0 10px 0;
	border-radius: 5px;
	font-size: 18px;
`;

export const ButtonsContainer = styled.div`
	display: flex;
	justify-content: right;
	:nth-child(1) {
		margin-right: 10px;
	}
`;
