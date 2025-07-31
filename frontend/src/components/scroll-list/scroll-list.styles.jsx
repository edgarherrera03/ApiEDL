import styled from "styled-components";
import {
	backgroundDark,
	backgroundLightDark,
	backgroundMediumDark,
	infoText,
} from "../../assets/_variables";

export const ScrollListContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	border-top: 1px solid ${backgroundLightDark};
	border-radius: 5px;
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

export const Icon = styled.div`
	width: 200px;
	display: flex;
	align-items: center;
	padding: 15px 10px;
	cursor: pointer;
	span {
		font-size: 30px;
		height: 100%;
		align-content: center;
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
	border-bottom: ${({ $details }) =>
		$details ? `none` : `1px solid ${backgroundLightDark}`};
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

export const ItemDetails = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px 20px;
	border-bottom: 1px solid ${backgroundLightDark};
`;

export const CommentsContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	gap: 10px;
	span {
		font-weight: bold;
		color: ${backgroundDark};
		font-size: 1rem;
	}
	input {
		border-radius: 5px;
		padding: 5px 10px;
		font-size: 16px;
		width: 80%;
	}
	form {
		display: flex;
		width: 100%;
		gap: 5px;
	}
`;

export const CommentSection = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ButtonSection = styled.div`
	display: flex;
	gap: 10px;
`;

export const Comment = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	span {
		color: ${backgroundMediumDark};
	}
`;
