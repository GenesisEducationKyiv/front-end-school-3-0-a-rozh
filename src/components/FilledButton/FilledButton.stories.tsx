import type { Meta, StoryObj } from '@storybook/react-vite';
import { HiOutlineCheck, HiOutlineXMark } from 'react-icons/hi2';

import FilledButton from './FilledButton';

const meta: Meta<typeof FilledButton> = {
    title: 'Components/Button',
    component: FilledButton,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A customizable filled button component following Material 3 design principles. Supports different sizes, colors, and can include icons.',
            },
        },
    },
    argTypes: {
        label: {
            description: 'The text or content to display inside the button',
            control: 'text',
        },
        icon: {
            description: 'Optional icon to display alongside the label',
            control: false,
        },
        size: {
            description: 'Size variant of the button',
            control: 'select',
            options: ['small', 'medium', 'large'],
        },
        color: {
            description: 'Color variant of the button',
            control: 'select',
            options: ['primary', 'accept', 'reject'],
        },
        disabled: {
            description: 'Whether the button is disabled',
            control: 'boolean',
        },
        onClick: {
            description: 'Click handler function',
            action: 'clicked',
        },
    },
};

export default meta;
type Story = StoryObj<typeof FilledButton>;

export const Default: Story = {
    args: {
        label: 'Submit',
        icon: <HiOutlineCheck />,
    },
    parameters: {
        docs: {
            description: {
                story: 'The default button with medium size and primary color.',
            },
        },
    },
};

export const Disabled: Story = {
    args: {
        label: 'Submit',
        disabled: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'A disabled button that cannot be clicked.',
            },
        },
    },
};

export const SmallApprove: Story = {
    args: {
        label: 'Approve',
        icon: <HiOutlineCheck />,
        size: 'small',
        color: 'accept',
    },
    parameters: {
        docs: {
            description: {
                story: 'A small button with accept color for approval actions.',
            },
        },
    },
};

export const SmallReject: Story = {
    args: {
        label: 'Reject',
        icon: <HiOutlineXMark />,
        size: 'small',
        color: 'reject',
    },
    parameters: {
        docs: {
            description: {
                story: 'A small button with reject color for rejection actions.',
            },
        },
    },
};

export const LargePrimary: Story = {
    args: {
        label: 'Continue',
        size: 'large',
        color: 'primary',
    },
    parameters: {
        docs: {
            description: {
                story: 'A large button without icon for primary actions.',
            },
        },
    },
};

export const WithoutIcon: Story = {
    args: {
        label: 'Save Changes',
        size: 'medium',
        color: 'primary',
    },
    parameters: {
        docs: {
            description: {
                story: 'A button without an icon.',
            },
        },
    },
};
