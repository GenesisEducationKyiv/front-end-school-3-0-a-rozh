import type { Meta, StoryObj } from '@storybook/react-vite';

import SearchBar from './SearchBar';

const meta: Meta<typeof SearchBar> = {
    title: 'Components/SearchBar',
    component: SearchBar,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A search input component with a search icon. Supports all standard HTML input attributes.',
            },
        },
    },
    argTypes: {
        placeholder: {
            description: 'Placeholder text shown when the input is empty',
            control: 'text',
        },
        disabled: {
            description: 'Whether the search input is disabled',
            control: 'boolean',
        },
        value: {
            description: 'Current value of the search input',
            control: 'text',
        },
        onChange: {
            description: 'Callback fired when the input value changes',
            action: 'changed',
        },
        onFocus: {
            description: 'Callback fired when the input receives focus',
            action: 'focused',
        },
        onBlur: {
            description: 'Callback fired when the input loses focus',
            action: 'blurred',
        },
    },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
    args: {
        placeholder: 'Search...',
    },
    parameters: {
        docs: {
            description: {
                story: 'The default search bar with placeholder text.',
            },
        },
    },
};

export const WithValue: Story = {
    args: {
        placeholder: 'Search...',
        value: 'example search',
    },
    parameters: {
        docs: {
            description: {
                story: 'A search bar with a predefined value.',
            },
        },
    },
};

export const Disabled: Story = {
    args: {
        placeholder: 'Search...',
        disabled: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'A disabled search bar that cannot be interacted with.',
            },
        },
    },
};

export const DifferentPlaceholder: Story = {
    args: {
        placeholder: 'Find your music tracks...',
    },
    parameters: {
        docs: {
            description: {
                story: 'A search bar with custom placeholder text.',
            },
        },
    },
};
