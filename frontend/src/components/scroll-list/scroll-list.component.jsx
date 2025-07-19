import {
	ScrollListContainer,
	ScrollListHeaders,
	Header,
	ScollListInformation,
	Item,
	Info,
} from "./scroll-list.styles";
const ScrollList = ({ headersList, ordersList, itemList }) => {
	return (
		<ScrollListContainer>
			<ScrollListHeaders>
				{headersList.map((header) => (
					<Header>
						<span>{header}</span>
					</Header>
				))}
			</ScrollListHeaders>
			<ScollListInformation>
				{itemList.map((item, index) => (
					<Item key={index}>
						{ordersList.map((key, i) => (
							<Info key={i}>
								<span>{item[key]}</span>
							</Info>
						))}
					</Item>
				))}
			</ScollListInformation>
		</ScrollListContainer>
	);
};
export default ScrollList;
