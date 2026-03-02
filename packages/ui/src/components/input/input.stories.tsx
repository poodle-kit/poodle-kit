import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AnimatedMessage } from '@poodle-kit/animate';
import { Input } from './input';
import { InputMessage } from './input-message';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'centered' },
  args: {
    placeholder: 'Enter text...',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Playground: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
  },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <div className="flex flex-col gap-1">
        <Input label="Default" placeholder="기본 상태" />
      </div>
      <div className="flex flex-col gap-1">
        <Input label="Error" placeholder="에러 상태" error />
        <InputMessage error>
          올바른 이메일을 입력해주세요.
        </InputMessage>
      </div>
      <div className="flex flex-col gap-1">
        <Input label="Success" placeholder="성공 상태" success />
        <InputMessage>사용 가능한 이메일이에요.</InputMessage>
      </div>
    </div>
  ),
};

export const WithHelpText: Story = {
  render: () => (
    <div className="flex flex-col gap-1 w-64">
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
      />
      <InputMessage>8자 이상 입력해주세요.</InputMessage>
    </div>
  ),
};

export const Required: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    value: '수정할 수 없어요',
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-64">
      <Input size="sm" placeholder="Small" />
      <Input size="default" placeholder="Default" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-64">
      <Input leftIcon={<SearchIcon />} placeholder="검색..." />
      <Input
        rightIcon={<EyeIcon />}
        type="password"
        placeholder="비밀번호"
      />
      <Input
        leftIcon={<SearchIcon />}
        rightIcon={<EyeIcon />}
        placeholder="양쪽 아이콘"
      />
    </div>
  ),
};

export const WithIconClick: Story = {
  render: () => {
    return (
      <Input
        rightIcon={<EyeIcon />}
        type="password"
        placeholder="비밀번호"
        onRightIconClick={() => alert('아이콘 클릭!')}
      />
    );
  },
};

function AnimatedInputDemo() {
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <div className="flex flex-col gap-3 w-64">
      <div className="flex flex-col gap-1">
        <Input
          label="Email"
          placeholder="you@example.com"
          error={!!error}
        />
        <AnimatedMessage>
          {error && <InputMessage error>{error}</InputMessage>}
        </AnimatedMessage>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setError('올바른 이메일을 입력해주세요.')}
          className="px-3 py-1 text-xs bg-danger text-white rounded"
        >
          에러 표시
        </button>
        <button
          onClick={() => setError(undefined)}
          className="px-3 py-1 text-xs bg-secondary rounded"
        >
          에러 제거
        </button>
      </div>
    </div>
  );
}

/** 에러 메시지에 fade+slide 애니메이션 적용 */
export const WithMessageAnimation: Story = {
  render: () => <AnimatedInputDemo />,
};
