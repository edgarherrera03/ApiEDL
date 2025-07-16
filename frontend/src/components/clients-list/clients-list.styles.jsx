import styled from "styled-components";

export const ClientsListContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 95%;
	pointer-events: ${(props) => (props.$activated ? "none" : "auto")};
	opacity: ${(props) => (props.$activated ? 0.5 : 1)};
`;
