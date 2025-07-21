import { BlockedIconContainer } from "./blocked-icon.styles";

const BlockedIcon = ({ blocked }) => {
	return (
		<BlockedIconContainer $blocked={blocked}>
			{blocked ? <p>&#10003;</p> : <p>&#10005;</p>}
		</BlockedIconContainer>
	);
};

export default BlockedIcon;
