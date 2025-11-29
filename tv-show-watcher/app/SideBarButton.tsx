import { ButtonProps } from "@mui/material/Button";

type PrimaryButtonProps = ButtonProps;

const SideBarButton: React.FC<PrimaryButtonProps> = ({ children, ...props }) => {
    return (
        <button
            {...props} className="cursor-pointer"
        >
            <h2 className="font-sans font-medium text-[20px] leading-[26px]">
                <p className="gap-2 flex items-center">{children}</p>
            </h2>
        </button>
    );
};

export default SideBarButton;