import styled from "styled-components";
import FormInput from "../form-input/form-input.component";
import {
	backgroundDark,
	backgroundMediumDark,
	dangerColor,
	greenColor,
	infoText,
} from "../../assets/_variables";

export const UserInformationContainer = styled.div`
	display: flex;
	width: 80%;
	justify-content: center;
	gap: 40px;
	pointer-events: ${(props) => (props.$activated ? "none" : "auto")};
	opacity: ${(props) => (props.$activated ? 0.5 : 1)};
`;
export const UserInformation = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${backgroundMediumDark};
	border-radius: 5px;
	padding-bottom: 10px;
	min-width: 380px;
	height: 280px;
	h3 {
		color: ${infoText};
	}
	span {
		font-size: 18px;
		font-weight: 400;
		margin-bottom: 10px;
	}
`;

export const ChangePassword = styled.div`
	display: flex;
	flex-direction: column;
`;
export const ChangePasswordContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 280px;
	align-items: center;
	background-color: ${backgroundMediumDark};
	border-radius: 5px;
	padding-bottom: 10px;
	min-width: 380px;
	h3 {
		color: ${infoText};
	}
`;

export const ChangePasswordInput = styled(FormInput)`
	margin-bottom: 0px;
`;

export const PasswordRequirementsContainer = styled.div`
	color: ${backgroundDark};
	margin-top: 20px;
	li {
	}
`;
export const PasswordRequirement = styled.li`
	margin-bottom: 3px;
	color: ${(props) =>
		props.$validationStatus ? `${greenColor}` : `${dangerColor}`};
`;

export const InfoInput = styled(FormInput)`
	pointer-events: none;
`;
