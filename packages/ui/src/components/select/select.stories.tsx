import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './select';
import { SelectTrigger, SelectValue } from './select-trigger';
import { SelectContent } from './select-content';
import { SelectItem } from './select-item';
import {
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from './select-group';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: { layout: 'centered' },
  args: {
    disabled: false,
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

/* -------------------------------------------------------------------------------------------------
 * Playground
 * -----------------------------------------------------------------------------------------------*/

export const Playground: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="옵션 선택..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
        <SelectItem value="durian" disabled>
          Durian (품절)
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

/* -------------------------------------------------------------------------------------------------
 * Controlled
 * -----------------------------------------------------------------------------------------------*/

function ControlledDemo() {
  const [value, setValue] = useState<string>('');

  return (
    <div className="flex flex-col items-center gap-4">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="프레임워크 선택..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="svelte">Svelte</SelectItem>
          <SelectItem value="angular">Angular</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">
        선택된 값: <strong>{value || '없음'}</strong>
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

/* -------------------------------------------------------------------------------------------------
 * WithGroups
 * -----------------------------------------------------------------------------------------------*/

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="국가 선택..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>아시아</SelectLabel>
          <SelectItem value="kr">🇰🇷 한국</SelectItem>
          <SelectItem value="jp">🇯🇵 일본</SelectItem>
          <SelectItem value="cn">🇨🇳 중국</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>유럽</SelectLabel>
          <SelectItem value="de">🇩🇪 독일</SelectItem>
          <SelectItem value="fr">🇫🇷 프랑스</SelectItem>
          <SelectItem value="uk">🇬🇧 영국</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>아메리카</SelectLabel>
          <SelectItem value="us">🇺🇸 미국</SelectItem>
          <SelectItem value="ca">🇨🇦 캐나다</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

/* -------------------------------------------------------------------------------------------------
 * WithDisabledItems
 * -----------------------------------------------------------------------------------------------*/

export const WithDisabledItems: Story = {
  render: () => (
    <Select defaultValue="basic">
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="basic">Basic</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
        <SelectItem value="enterprise" disabled>
          Enterprise (문의 필요)
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

/* -------------------------------------------------------------------------------------------------
 * Disabled
 * -----------------------------------------------------------------------------------------------*/

export const Disabled: Story = {
  render: () => (
    <Select defaultValue="react" disabled>
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="react">React</SelectItem>
        <SelectItem value="vue">Vue</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/* -------------------------------------------------------------------------------------------------
 * WithTextValue — children이 복잡한 경우 textValue로 label 지정
 * -----------------------------------------------------------------------------------------------*/

export const WithTextValue: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="팀원 선택..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="alice" textValue="Alice Johnson">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-medium">Alice Johnson</p>
              <p className="text-xs text-muted-foreground">
                Frontend
              </p>
            </div>
          </div>
        </SelectItem>
        <SelectItem value="bob" textValue="Bob Kim">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-bold">
              B
            </div>
            <div>
              <p className="text-sm font-medium">Bob Kim</p>
              <p className="text-xs text-muted-foreground">Backend</p>
            </div>
          </div>
        </SelectItem>
        <SelectItem value="carol" textValue="Carol Park">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-success text-success-foreground flex items-center justify-center text-xs font-bold">
              C
            </div>
            <div>
              <p className="text-sm font-medium">Carol Park</p>
              <p className="text-xs text-muted-foreground">Design</p>
            </div>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

/* -------------------------------------------------------------------------------------------------
 * WithCustomValue — SelectValue에 children으로 직접 표시 제어
 * -----------------------------------------------------------------------------------------------*/

function CustomValueDemo() {
  const [value, setValue] = useState('');

  const statusMap: Record<string, { label: string; color: string }> =
    {
      todo: { label: '할 일', color: 'bg-muted' },
      in_progress: { label: '진행 중', color: 'bg-info' },
      done: { label: '완료', color: 'bg-success' },
      cancelled: { label: '취소됨', color: 'bg-danger' },
    };

  const current = statusMap[value];

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-44">
        <SelectValue placeholder="상태 선택...">
          {current && (
            <span className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${current.color}`}
              />
              {current.label}
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(statusMap).map(([val, { label, color }]) => (
          <SelectItem key={val} value={val} textValue={label}>
            <span className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${color}`} />
              {label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export const WithCustomValue: Story = {
  render: () => <CustomValueDemo />,
};

/* -------------------------------------------------------------------------------------------------
 * Widths
 * -----------------------------------------------------------------------------------------------*/

export const Widths: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Select>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Small" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b">Option B</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Medium" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b">Option B</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-72">
          <SelectValue placeholder="Large" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b">Option B</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Full width" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b">Option B</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

/* -------------------------------------------------------------------------------------------------
 * ManyItems — 타입어헤드 및 스크롤 확인
 * -----------------------------------------------------------------------------------------------*/

const FRUITS = [
  'Apple',
  'Apricot',
  'Avocado',
  'Banana',
  'Blueberry',
  'Cherry',
  'Coconut',
  'Durian',
  'Fig',
  'Grape',
  'Guava',
  'Kiwi',
  'Lemon',
  'Lime',
  'Lychee',
  'Mango',
  'Melon',
  'Orange',
  'Papaya',
  'Peach',
  'Pear',
  'Pineapple',
  'Plum',
  'Pomegranate',
  'Raspberry',
  'Strawberry',
  'Watermelon',
];

export const ManyItems: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="과일 선택..." />
      </SelectTrigger>
      <SelectContent>
        {FRUITS.map((fruit) => (
          <SelectItem key={fruit} value={fruit.toLowerCase()}>
            {fruit}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};
