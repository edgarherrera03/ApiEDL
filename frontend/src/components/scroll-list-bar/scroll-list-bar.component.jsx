import {
	ScrollListBarContainer,
	ScrollListBarItem,
	CustomSupressButton,
} from "./scroll-list-bar.styles";

const ScrollListBar = ({ items, onDelete }) => {
	return (
		<ScrollListBarContainer>
			{items.map((item, index) => (
				<ScrollListBarItem key={index}>
					<CustomSupressButton type="button" onClick={() => onDelete(item)}>
						-
					</CustomSupressButton>
					<span>{item}</span>
				</ScrollListBarItem>
			))}
		</ScrollListBarContainer>
	);
};

export default ScrollListBar;
