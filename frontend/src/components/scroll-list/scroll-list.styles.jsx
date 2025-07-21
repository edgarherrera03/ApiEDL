import styled from "styled-components";
import { backgroundDark, backgroundLightDark } from "../../assets/_variables";

export const ScrollListContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	border-top: 1px solid ${backgroundLightDark};
`;

export const ScrollListHeaders = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 60px;
	border-bottom: 1px solid ${backgroundLightDark};
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	padding: 0 20px;
	width: 100%;
	height: 100%;
	span {
		color: ${backgroundDark};
		font-weight: bold;
	}
`;

export const ScollListInformation = styled.div`
	display: flex;
	flex-direction: column;
	height: ${({ $height }) => ($height ? `${$height}px` : "auto")};
	overflow-y: auto;
`;

export const Item = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid ${backgroundLightDark};
	padding: 5px 0;
`;

export const Info = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	width: 100%;
	padding: 15px 20px;
	overflow-wrap: break-word;
	word-break: break-word;
`;
