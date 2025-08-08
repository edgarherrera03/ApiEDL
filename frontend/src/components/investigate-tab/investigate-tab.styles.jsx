import styled from "styled-components";
import { backgroundDark } from "../../assets/_variables";
import Select from "react-select";

export const InvestigateTabContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 20px;
`;

export const InvestigateTabTitle = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	h1 {
		color: ${backgroundDark};
		font-size: 2.5rem;
		margin-bottom: 10px;
	}
`;

export const InvestigateTabContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 100%;
	form {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 5px;
		min-height: 40px;
		/* width: 100%; */

		input {
			height: 40px;
			box-sizing: border-box;
			border: 1px solid ${backgroundDark};
			padding: 0 10px;
			font-size: 1rem;
			border-radius: 5px;
			width: 40%;
		}
	}
`;

export const SelectFilter = styled(Select).attrs({
	classNamePrefix: "custom-select",
})`
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

export const InvestigateResultContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 15px;
	align-items: center;
	width: 100%;
	margin-bottom: 40px;
	line-height: 15px;
`;

export const Result = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	span {
		color: ${backgroundDark};
		font-weight: bold;
	}
`;
