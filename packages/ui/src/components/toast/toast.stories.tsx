import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button';
import { toast } from './toast';
import { Toaster } from './toaster';
import type { ToasterProps } from './types';

/**
 * Toaster + toast() 조합 스토리
 *
 * 모든 스토리에 <Toaster /> 데코레이터가 적용되어 있다.
 * args로 position / defaultDuration / maxToasts 조절 가능.
 */
const meta: Meta<ToasterProps> = {
  title: 'Components/Toast',
  component: Toaster,
  parameters: { layout: 'centered' },
  decorators: [
    (Story, { args }) => (
      <>
        <Story />
        {/* 데코레이터에서 Toaster 렌더 — args 변경 시 즉시 반영 */}
        <Toaster {...args} />
      </>
    ),
  ],
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
    },
    defaultDuration: { control: 'number' },
    maxToasts: { control: 'number' },
  },
  args: {
    position: 'bottom-right',
    defaultDuration: 3000,
    maxToasts: 5,
  },
};

export default meta;
type Story = StoryObj<ToasterProps>;

// ─── Playground ───────────────────────────────────────────────────────────────

/** 버튼을 눌러 각 타입의 토스트를 직접 띄워볼 수 있다 */
export const Playground: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast('기본 알림입니다')}>
        Default
      </Button>
      <Button
        variant="success"
        onClick={() => toast.success('저장되었습니다')}
      >
        Success
      </Button>
      <Button
        variant="danger"
        onClick={() => toast.error('오류가 발생했습니다')}
      >
        Error
      </Button>
      <Button
        variant="warning"
        onClick={() => toast.warning('주의가 필요합니다')}
      >
        Warning
      </Button>
      <Button
        variant="info"
        onClick={() => toast.info('참고 사항입니다')}
      >
        Info
      </Button>
    </div>
  ),
};

// ─── With Description ─────────────────────────────────────────────────────────

/** 제목 아래에 부가 설명이 표시된다 */
export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          toast.success('저장되었습니다', {
            description: '변경 사항이 성공적으로 저장되었습니다.',
          })
        }
      >
        Success + 설명
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          toast.error('업로드 실패', {
            description: '파일 크기가 10MB를 초과합니다.',
          })
        }
      >
        Error + 설명
      </Button>
      <Button
        variant="warning"
        onClick={() =>
          toast.warning('저장되지 않은 변경 사항', {
            description: '페이지를 벗어나면 변경 사항이 사라집니다.',
          })
        }
      >
        Warning + 설명
      </Button>
    </div>
  ),
};

// ─── Dismissible ──────────────────────────────────────────────────────────────

/** dismissible=true 일 때만 닫기 버튼이 표시된다 */
export const Dismissible: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          toast.info('닫기 버튼 있음', {
            description: '우측의 ✕를 눌러 직접 닫을 수 있습니다.',
            dismissible: true,
            duration: Infinity,
          })
        }
      >
        Dismissible (수동)
      </Button>
      <Button
        variant="success"
        onClick={() =>
          toast.success('닫기 버튼 없음', {
            description: '3초 후 자동으로 사라집니다.',
          })
        }
      >
        Auto dismiss (닫기 없음)
      </Button>
    </div>
  ),
};

// ─── Custom Icon ──────────────────────────────────────────────────────────────

/** icon prop으로 커스텀 아이콘을 제공할 수 있다 */
export const CustomIcon: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast('커스텀 아이콘 토스트', {
          description: '이모지도 아이콘으로 사용할 수 있습니다.',
          icon: (
            <span style={{ fontSize: 16, lineHeight: 1 }}>🎉</span>
          ),
        })
      }
    >
      커스텀 아이콘
    </Button>
  ),
};

// ─── Types ────────────────────────────────────────────────────────────────────

/** 5가지 타입을 한 번에 띄워 색상 차이를 확인한다 */
export const AllTypes: Story = {
  render: () => (
    <Button
      onClick={() => {
        toast('기본 알림');
        toast.success('성공');
        toast.error('오류');
        toast.warning('주의');
        toast.info('안내');
      }}
    >
      모든 타입 띄우기
    </Button>
  ),
};

// ─── Manual Dismiss ───────────────────────────────────────────────────────────

/** duration: Infinity + dismissible=true — 닫기 버튼을 눌러야만 사라진다 */
export const ManualDismiss: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast.success('직접 닫아야 사라집니다', {
          duration: Infinity,
          dismissible: true,
        })
      }
    >
      수동 닫기 토스트
    </Button>
  ),
};

// ─── Dismiss by ID ────────────────────────────────────────────────────────────

/** toast()가 반환하는 id로 외부에서 특정 토스트를 제거할 수 있다 */
export const DismissById: Story = {
  render: () => {
    let id: string | null = null;
    return (
      <div className="flex gap-2">
        <Button
          onClick={() => {
            id = toast('5초짜리 토스트', { duration: 5000 });
          }}
        >
          토스트 띄우기
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            if (id) toast.dismiss(id);
          }}
        >
          즉시 제거
        </Button>
      </div>
    );
  },
};

// ─── Stack ────────────────────────────────────────────────────────────────────

/** 여러 토스트가 쌓이는 모습. maxToasts(기본 5) 초과 시 오래된 것이 숨겨진다 */
export const Stack: Story = {
  render: () => (
    <Button
      onClick={() => {
        toast.success('첫 번째');
        toast.info('두 번째');
        toast.warning('세 번째');
        toast.error('네 번째');
        toast('다섯 번째');
      }}
    >
      5개 한번에 띄우기
    </Button>
  ),
};

// ─── Positions ────────────────────────────────────────────────────────────────

/**
 * Controls 패널에서 position을 바꿔가며 위치를 확인한다.
 * Storybook 우측 Controls → position 드롭다운 선택
 */
export const Positions: Story = {
  render: () => (
    <Button onClick={() => toast.success('위치 확인용 토스트')}>
      토스트 띄우기
    </Button>
  ),
};
