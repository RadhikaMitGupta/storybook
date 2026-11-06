import type {
  Meta,
  StoryObj,
} from '@storybook/react-native';

import Dropdown from './Dropdown';

import type {
  DropdownOption,
} from './Dropdown.types';

const options: DropdownOption[] = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
  { label: 'Option 4', value: 'option-4' },
  { label: 'Option 5', value: 'option-5' },
];

const products: DropdownOption[] = [
  { label: 'Product 1', value: 'product-1' },
  { label: 'Product 2', value: 'product-2' },
  { label: 'Product 3', value: 'product-3' },
  { label: 'Product 4', value: 'product-4' },
  { label: 'Product 5', value: 'product-5' },
];

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,

  args: {
    options,
    placeholder: 'Placeholder Text',
    maxVisibleTags: 3,
    maxDropdownHeight: 240,
  },

  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'hover',
        'disabled',
        'focused',
        'active',
        'captured',
        'captured_multi',
      ],
    },

    multiple: {
      control: 'boolean',
    },

    disabled: {
      control: 'boolean',
    },

    searchable: {
      control: 'boolean',
    },

    maxVisibleTags: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Hover: Story = {
  args: {
    variant: 'hover',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'disabled',
  },
};

export const Focused: Story = {
  args: {
    variant: 'focused',
  },
};

export const Active: Story = {
  args: {
    variant: 'active',
  },
};

export const Captured: Story = {
  args: {
    variant: 'captured',
    options: products,
    defaultValue: 'product-1',
  },
};

export const CapturedMulti: Story = {
  args: {
    variant: 'captured_multi',
    options: products,
    defaultValue: products.map(item => item.value),
    maxVisibleTags: 3,
  },
};

export const Searchable: Story = {
  args: {
    options: products,
    searchable: true,
  },
};

export const MultiSelect: Story = {
  args: {
    options: products,
    multiple: true,
  },
};

export const WithDisabledOptions: Story = {
  args: {
    variant: 'active',
    options: [
      ...options.slice(0, 2),
      {
        label: 'Unavailable option',
        value: 'unavailable',
        disabled: true,
      },
      ...options.slice(2),
    ],
  },
};