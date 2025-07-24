import {
	ScrollListContainer,
	ScrollListHeaders,
	Header,
	ScollListInformation,
	Item,
	Info,
} from "./scroll-list.styles";
import BlockedIcon from "../blocked-icon/blocked-icon.component";

const ScrollList = ({ headersList, ordersList, itemList, height = "" }) => {
	return (
		<ScrollListContainer>
			<ScrollListHeaders>
				{headersList.map((header) => (
					<Header key={header}>
						<span>{header}</span>
					</Header>
				))}
			</ScrollListHeaders>
			<ScollListInformation $height={height}>
				{itemList.map((item, index) => (
					<>
						<Item key={index}>
							{ordersList.map((key, i) => (
								<Info key={i}>
									{key === "blocked" ? (
										<BlockedIcon blocked={item[key]} />
									) : (
										<span>{item[key]}</span>
									)}
								</Info>
							))}
						</Item>
					</>
				))}
			</ScollListInformation>
		</ScrollListContainer>
	);
};
export default ScrollList;
