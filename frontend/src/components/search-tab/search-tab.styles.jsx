import styled from "styled-components";
import { backgroundDark } from "../../assets/_variables";

export const SearchTabContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;
export const SearchTabTitle = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	h1 {
		color: ${backgroundDark};
		font-size: 2.5rem;
		margin-bottom: 10px;
	}
`;

export const SearchTabContent = styled.div`
	width: 100%;
`;
