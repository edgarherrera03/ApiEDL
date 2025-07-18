import {
	BaseButton,
	DeleteButton,
	ModifyButton,
	AddButton,
	SeeButton,
	GenerateButton,
} from "./button.styles.jsx";

export const BUTTON_TYPE_CLASSES = {
	base: "base",
	delete: "delete",
	modify: "modify",
	add: "add",
	see: "see",
	generate: "generate",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
	({
		[BUTTON_TYPE_CLASSES.base]: BaseButton,
		[BUTTON_TYPE_CLASSES.delete]: DeleteButton,
		[BUTTON_TYPE_CLASSES.modify]: ModifyButton,
		[BUTTON_TYPE_CLASSES.add]: AddButton,
		[BUTTON_TYPE_CLASSES.see]: SeeButton,
		[BUTTON_TYPE_CLASSES.generate]: GenerateButton,
	}[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
	const CustomButton = getButton(buttonType);
	return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
