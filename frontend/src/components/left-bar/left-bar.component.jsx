import { LeftBarContainer, LeftBarRoute } from "./left-bar.styles";

const LeftBar = ({ selected, onSelect, routes }) => {
	return (
		<LeftBarContainer>
			{Object.entries(routes).map(([key, label]) => (
				<LeftBarRoute
					key={key}
					$selected={selected === key}
					onClick={() => onSelect(key)}>
					<span>{label}</span>
				</LeftBarRoute>
			))}
		</LeftBarContainer>
	);
};

export default LeftBar;
