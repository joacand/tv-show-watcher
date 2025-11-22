import Button, { ButtonProps } from "@mui/material/Button";

type PrimaryButtonProps = ButtonProps;

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, ...props }) => {
    return (
        <Button
            {...props}
            variant="contained"
        >
            {children}
        </Button>
    );
};

export default PrimaryButton;