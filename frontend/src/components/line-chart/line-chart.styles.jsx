import styled from "styled-components";
import { backgroundDark, backgroundWhite } from "../../assets/_variables";
import { ReactComponent as DownloadSvg } from "../../assets/download.svg";

export const LineChartContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px 10px 25px 0;
	height: fit-content;
	background-color: ${backgroundWhite};
	border-radius: 10px;
	min-width: 600px;
	width: 80%;
	span {
		font-size: 20px;
		color: ${backgroundDark};
		margin-bottom: 20px;
	}
`;

export const FilterContainer = styled.div`
	display: flex;
	gap: 20px;
	select {
		min-height: 20px;
		font-size: 14px;
	}
`;

export const DownloadButton = styled(DownloadSvg)`
	cursor: pointer;
	height: 25px;
`;
