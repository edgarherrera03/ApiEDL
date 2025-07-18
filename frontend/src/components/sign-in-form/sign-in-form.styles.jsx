import styled from "styled-components";
import { backgroundMediumDark, infoText } from "../../assets/_variables";

export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 400px;
	max-height: 380px;
	background-color: ${backgroundMediumDark};
	border-radius: 10px;
	box-shadow: 0 8px rgba(0, 0, 0, 0.2);
	padding: 10px 20px 20px 20px;
	h2 {
		margin: 10px 0;
		color: ${infoText};
	}

	form {
		display: flex;
		flex-direction: column;
		align-content: right;
	}
`;
