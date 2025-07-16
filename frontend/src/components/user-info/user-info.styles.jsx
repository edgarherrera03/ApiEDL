import styled from "styled-components";
import FormInput from "../form-input/form-input.component";
import {
	backgroundLightDark,
	backgroundMediumDark,
	backgroundWhite,
	dangerColor,
	greenColor,
	infoText,
} from "../../assets/_variables";

export const UserContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 400px;
	h1 {
		color: ${backgroundWhite};
		font-size: 30px;
		border-bottom: 1px solid ${backgroundLightDark};
		text-align: center;
		padding-bottom: 15px;
	}
	pointer-events: ${(props) => (props.$activated ? "none" : "auto")};
	opacity: ${(props) => (props.$activated ? 0.5 : 1)};
`;
export const UserInformationContainer = styled.div`
	display: flex;
	flex-direction: column;
`;
export const UserInformation = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
	color: ${backgroundWhite};
	padding: 0 10px;
	border-bottom: 1px solid ${backgroundLightDark};
	span {
		font-size: 18px;
		font-weight: 400;
		margin-bottom: 10px;
	}
`;
export const ChangePasswordContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: auto;
	align-items: center;
	background-color: ${backgroundMediumDark};
	border-radius: 5px;
	padding-bottom: 10px;
	h3 {
		color: ${infoText};
	}
`;

export const ChangePasswordInput = styled(FormInput)`
	margin-bottom: 0px;
`;

export const PasswordRequirementsContainer = styled.div`
	color: ${backgroundWhite};
	margin-top: 20px;
	li {
	}
`;
export const PasswordRequirement = styled.li`
	margin-bottom: 3px;
	color: ${(props) =>
		props.$validationStatus ? `${greenColor}` : `${dangerColor}`};
`;
