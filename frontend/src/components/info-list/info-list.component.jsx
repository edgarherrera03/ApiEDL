import {
	InfoListContainer,
	InfoListHeader,
	HeaderTitle,
	InformationContainer,
	InfoItem,
	Info,
} from "./info-list.styles";

const InfoList = ({
	headerTitleList,
	infoList,
	orderedKeys,
	renderActions,
	activated = false,
	height = "",
}) => {
	return (
		<InfoListContainer $activated={activated}>
			<InfoListHeader>
				{headerTitleList.map((title) => (
					<HeaderTitle key={title}>
						<span>{title}</span>
					</HeaderTitle>
				))}
			</InfoListHeader>
			<InformationContainer $height={height}>
				{infoList.map((item, index) => (
					<InfoItem key={index}>
						{orderedKeys.map((key, i) => (
							<Info key={i}>
								{key === "actions" ? (
									renderActions ? (
										renderActions(item)
									) : (
										<span></span>
									)
								) : (
									<span>{item[key]}</span>
								)}
							</Info>
						))}
					</InfoItem>
				))}
			</InformationContainer>
		</InfoListContainer>
	);
};

export default InfoList;
