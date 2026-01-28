import type { Meta, StoryObj } from '@storybook/react';
import { StyledButton } from './button-styled';

const meta: Meta<typeof StyledButton> = {
  title: 'Components/Button',
  component: StyledButton,
  parameters: { layout: 'centered' },
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: [
        'default',
        'secondary',
        'ghost',
        'destructive',
        'outline',
        'link',
      ],
    },
    size: {
      control: 'radio',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StyledButton>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <StyledButton {...args} variant="default">
        Default
      </StyledButton>
      <StyledButton {...args} variant="secondary">
        Secondary
      </StyledButton>
      <StyledButton {...args} variant="ghost">
        Ghost
      </StyledButton>
      <StyledButton {...args} variant="destructive">
        Destructive
      </StyledButton>
      <StyledButton {...args} variant="outline">
        Outline
      </StyledButton>
      <StyledButton {...args} variant="link">
        Link
      </StyledButton>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <StyledButton {...args} size="sm">
        Small
      </StyledButton>
      <StyledButton {...args} size="default">
        Default
      </StyledButton>
      <StyledButton {...args} size="lg">
        Large
      </StyledButton>
    </div>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <StyledButton {...args} size="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </StyledButton>
      <StyledButton {...args}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <path d="M5 12h14" />
        </svg>
        With Icon
      </StyledButton>
    </div>
  ),
};

export const AsChild: Story = {
  render: () => (
    <StyledButton asChild>
      <a href="https://github.com">Link as Button</a>
    </StyledButton>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};
