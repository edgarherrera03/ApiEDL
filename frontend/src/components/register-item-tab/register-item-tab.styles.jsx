import styled from "styled-components";
import { backgroundDark, backgroundWhite } from "../../assets/_variables";
import Select from "react-select";

export const RegisterItemTabContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	gap: 20px;
`;

export const RegisterItemTabTitle = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	h1 {
		color: ${backgroundDark};
		font-size: 2.5rem;
		margin-bottom: 10px;
	}
`;

export const RegisterItemContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 70%;
	align-items: center;
	background-color: ${backgroundWhite};
	border-radius: 10px;
	box-shadow: 0px 5px rgb(0, 0, 0, 0.2);
	padding: 25px 0 25px 0;
	span {
		color: ${backgroundDark};
		font-size: 25px;
		font-weight: 800;
	}
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		min-height: 400px;
		width: 100%;
	}
`;

export const SelectFilter = styled(Select).attrs({
	classNamePrefix: "custom-select",
})`
	font-size: 18px;
	margin: 5px 0;
	width: 85%;
	.custom-select__control {
		height: 40px !important;
		min-height: 40px !important;
		border-radius: 5px;
		border: 1px solid ${backgroundDark};
	}

	.custom-select__value-container {
		height: 100%;
		padding: 0 10px !important;
		display: flex;
		align-items: center;
	}

	.custom-select__input {
		margin: 0 !important;
		padding: 0 5px !important;
		display: flex;
		align-items: center;
		height: 100%;
	}
`;

export const InputLabel = styled.label`
	font-size: 18px;
	color: ${backgroundDark};
	display: flex;
	flex-direction: column;
	text-align: left;
	width: 85%;
	font-weight: bold;
`;
export const Selector = styled.select`
	width: 100%;
	padding: 8px;
	margin: 8px 0 10px 0;
	border-radius: 5px;
	font-size: 18px;
`;

export const Input = styled.input`
	width: 100%;
	box-sizing: border-box;
	padding: 8px;
	margin: 8px 0 10px 0;
	border-radius: 5px;
	font-size: 18px;
`;

export const Option = styled.div`
	display: flex;
	width: 85%;
	gap: 15px;
	align-items: center;
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: right;
	width: 85%;
`;
