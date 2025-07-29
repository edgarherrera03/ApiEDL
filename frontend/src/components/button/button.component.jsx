import {
	BaseButton,
	DeleteButton,
	ModifyButton,
	AddButton,
	GenerateButton,
	SeeMoreButton,
	DeleteItemButton,
} from "./button.styles.jsx";

export const BUTTON_TYPE_CLASSES = {
	base: "base",
	delete: "delete",
	modify: "modify",
	add: "add",
	generate: "generate",
	seeMore: "seeMore",
	deleteItem: "deleteItem",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
	({
		[BUTTON_TYPE_CLASSES.base]: BaseButton,
		[BUTTON_TYPE_CLASSES.delete]: DeleteButton,
		[BUTTON_TYPE_CLASSES.modify]: ModifyButton,
		[BUTTON_TYPE_CLASSES.add]: AddButton,
		[BUTTON_TYPE_CLASSES.generate]: GenerateButton,
		[BUTTON_TYPE_CLASSES.seeMore]: SeeMoreButton,
		[BUTTON_TYPE_CLASSES.deleteItem]: DeleteItemButton,
	}[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
	const CustomButton = getButton(buttonType);
	return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
