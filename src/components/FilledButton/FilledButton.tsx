import './FilledButton.css';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonColor = 'primary' | 'accept' | 'reject';

/**
 * Props for the FilledButton component
 */
interface FilledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** The text or content to display inside the button */
    label: string | React.ReactNode;
    /** Optional icon to display alongside the label */
    icon?: React.ReactNode;
    /** Size variant of the button */
    size?: ButtonSize;
    /** Color variant of the button */
    color?: ButtonColor;
}

/**
 * A customizable filled button component with Material 3 design
 *
 * @param props - The component props
 * @returns A styled button element
 */
export default function FilledButton({
    label,
    icon,
    size = 'medium',
    color = 'primary',
    className = '',
    ...rest
}: FilledButtonProps) {
    const composedClassName = `m3-button size-${size} color-${color} ${className}`.trim();

    return (
        <button className={composedClassName} {...rest}>
            {icon && <span className="m3-icon">{icon}</span>}
            <span className="m3-label">{label}</span>
        </button>
    );
}
