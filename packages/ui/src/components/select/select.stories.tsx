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
      <SelectContent className="max-h-50 overflow-y-auto">
        {FRUITS.map((fruit) => (
          <SelectItem key={fruit} value={fruit.toLowerCase()}>
            {fruit}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};

/* -------------------------------------------------------------------------------------------------
 * EdgePositioning — 화면 모서리에서 flip/shift 동작 확인
 * 각 트리거를 viewport 모서리 근처에 배치해서 드롭다운이 밀려나는지 확인
 * -----------------------------------------------------------------------------------------------*/

const EDGE_ITEMS = [
  'Option A',
  'Option B',
  'Option C',
  'Option D',
  'Option E',
];

function EdgeSelect({ label }: { label: string }) {
  return (
    <Select>
      <SelectTrigger className="w-36">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {EDGE_ITEMS.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export const EdgePositioning: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="relative w-screen h-screen">
      {/* 좌상단 */}
      <div className="absolute top-2 left-2">
        <EdgeSelect label="좌상단" />
      </div>
      {/* 우상단 */}
      <div className="absolute top-2 right-2">
        <EdgeSelect label="우상단" />
      </div>
      {/* 좌하단 */}
      <div className="absolute bottom-2 left-2">
        <EdgeSelect label="좌하단" />
      </div>
      {/* 우하단 */}
      <div className="absolute bottom-2 right-2">
        <EdgeSelect label="우하단" />
      </div>
      {/* 중앙 하단 — flip 확인 */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <EdgeSelect label="하단 중앙" />
      </div>
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-muted-foreground text-center">
        각 모서리의 Select를 열어서
        <br />
        드롭다운 방향이 자동 조정되는지 확인
      </p>
    </div>
  ),
};

/* -------------------------------------------------------------------------------------------------
 * MobileViewport — 375px 너비에서 드롭다운이 잘리지 않는지 확인
 * -----------------------------------------------------------------------------------------------*/

export const MobileViewport: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile1' }, // 375×667
  },
  render: () => (
    <div className="flex flex-col gap-4 p-4 h-screen">
      {/* 상단 — 아래로 열려야 함 */}
      <div>
        <p className="text-xs text-muted-foreground mb-1">
          상단 (아래로 열림)
        </p>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="옵션 선택..." />
          </SelectTrigger>
          <SelectContent>
            {EDGE_ITEMS.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 하단 — 위로 flip 되어야 함 */}
      <div className="mt-auto">
        <p className="text-xs text-muted-foreground mb-1">
          하단 (위로 flip)
        </p>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="옵션 선택..." />
          </SelectTrigger>
          <SelectContent>
            {EDGE_ITEMS.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
};

/* -------------------------------------------------------------------------------------------------
 * ScrollContainer — 스크롤 컨테이너 안에서 위치 재계산 확인
 * -----------------------------------------------------------------------------------------------*/

export const ScrollContainer: Story = {
  parameters: { layout: 'centered' },
  render: () => (
    <div
      className="border border-input rounded-md overflow-y-auto"
      style={{ height: 300, width: 320 }}
    >
      <div
        className="flex flex-col gap-3 p-4"
        style={{ height: 800 }}
      >
        <p className="text-xs text-muted-foreground">
          드롭다운은 FloatingPortal로 컨테이너 밖(body)에 렌더돼요.
          {'\n'}
          스크롤 후 열었을 때 트리거 위치에 정확히 붙는지 확인하세요.
        </p>
        {/* 상단 */}
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="상단 Select" />
          </SelectTrigger>
          <SelectContent>
            {EDGE_ITEMS.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 중간 여백 */}
        <div style={{ height: 260 }} />

        {/* 하단 */}
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="하단 Select" />
          </SelectTrigger>
          <SelectContent>
            {EDGE_ITEMS.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
};
