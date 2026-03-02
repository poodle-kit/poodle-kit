import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ImageUploader } from './image-uploader';
import type {
  ExistingImage,
  ImageUploaderError,
} from './use-image-uploader';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockExistingImages: ExistingImage[] = [
  {
    id: 1,
    url: 'https://picsum.photos/seed/poodle1/200/200',
    sequence: 1,
  },
  {
    id: 2,
    url: 'https://picsum.photos/seed/poodle2/200/200',
    sequence: 2,
  },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof ImageUploader> = {
  title: 'Components/ImageUploader',
  component: ImageUploader,
  parameters: { layout: 'padded' },
  args: {
    maxImages: 4,
    disabled: false,
    layout: 'row',
  },
  argTypes: {
    layout: {
      control: 'radio',
      options: ['row', 'grid'],
    },
    maxImages: {
      control: { type: 'number', min: 1, max: 10 },
    },
    maxSizeMb: {
      control: { type: 'number', min: 1, max: 100 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageUploader>;

// ─── Stateful Story Components ────────────────────────────────────────────────

function DefaultStory() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className="flex flex-col gap-4">
      <ImageUploader
        onFileSelect={setFiles}
        onError={(err: ImageUploaderError) => alert(err.message)}
      />
      <p className="text-sm text-muted-foreground">
        선택된 파일: {files.length}개
      </p>
    </div>
  );
}

function WithExistingImagesStory() {
  const [files, setFiles] = useState<File[]>([]);
  const [deletedIds, setDeletedIds] = useState<
    Array<number | string>
  >([]);
  return (
    <div className="flex flex-col gap-4">
      <ImageUploader
        initialImages={mockExistingImages}
        onFileSelect={setFiles}
        onDeleteExisting={setDeletedIds}
        onError={(err: ImageUploaderError) => alert(err.message)}
      />
      <div className="text-sm text-muted-foreground space-y-1">
        <p>새 파일: {files.length}개</p>
        <p>삭제된 id: [{deletedIds.join(', ')}]</p>
      </div>
    </div>
  );
}

// ─── Stories ──────────────────────────────────────────────────────────────────

/** Controls 패널로 모든 props를 조작할 수 있어요 */
export const Playground: Story = {};

/** 기본 빈 상태 */
export const Default: Story = {
  render: () => <DefaultStory />,
};

/** 수정 모드 — 서버에서 받은 기존 이미지와 함께 렌더링돼요 */
export const WithExistingImages: Story = {
  render: () => <WithExistingImagesStory />,
};

/** grid layout — 이미지가 줄바꿈되며 격자로 배치돼요 */
export const GridLayout: Story = {
  render: () => (
    <ImageUploader
      initialImages={mockExistingImages}
      layout="grid"
      maxImages={6}
      onError={(err: ImageUploaderError) => alert(err.message)}
    />
  ),
};

/** 이미지 개수 제한 — 4장이 채워지면 추가 버튼이 사라져요 */
export const MaxImagesReached: Story = {
  render: () => (
    <ImageUploader
      initialImages={[
        {
          id: 1,
          url: 'https://picsum.photos/seed/a/200/200',
          sequence: 1,
        },
        {
          id: 2,
          url: 'https://picsum.photos/seed/b/200/200',
          sequence: 2,
        },
        {
          id: 3,
          url: 'https://picsum.photos/seed/c/200/200',
          sequence: 3,
        },
        {
          id: 4,
          url: 'https://picsum.photos/seed/d/200/200',
          sequence: 4,
        },
      ]}
      maxImages={4}
      onError={(err: ImageUploaderError) => alert(err.message)}
    />
  ),
};

/** 파일 크기 제한 — 5MB를 초과하면 onError가 호출돼요 */
export const WithSizeLimit: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <ImageUploader
        maxSizeMb={5}
        onError={(err: ImageUploaderError) => {
          console.error('[ImageUploader Error]', err);
          if (err.type === 'MAX_SIZE') alert(err.message);
        }}
      />
      <p className="text-sm text-muted-foreground">
        5MB 이하 이미지만 추가할 수 있어요
      </p>
    </div>
  ),
};

/** disabled 상태 — 모든 인터랙션이 비활성화돼요 */
export const Disabled: Story = {
  render: () => (
    <ImageUploader initialImages={mockExistingImages} disabled />
  ),
};

/** placeholder prop — 추가 버튼의 내용을 커스텀할 수 있어요 */
export const CustomPlaceholder: Story = {
  render: () => (
    <ImageUploader
      placeholder={
        <span className="text-xs font-medium text-center leading-tight px-1">
          사진
          <br />
          추가
        </span>
      }
      onError={(err: ImageUploaderError) => alert(err.message)}
    />
  ),
};

/** onError 콜백 — 에러 타입별 분기 처리 예시 */
export const ErrorHandling: Story = {
  render: () => {
    const handleError = (err: ImageUploaderError) => {
      switch (err.type) {
        case 'MAX_IMAGES':
          console.warn('최대 이미지 초과:', err.maxImages);
          break;
        case 'MAX_SIZE':
          console.warn(
            '파일 크기 초과:',
            err.file.name,
            err.maxSizeMb + 'MB',
          );
          break;
        case 'INVALID_TYPE':
          console.warn('지원하지 않는 형식:', err.file.name);
          break;
      }
    };

    return (
      <ImageUploader
        maxImages={2}
        maxSizeMb={1}
        accept="image/jpeg,image/png"
        onError={handleError}
      />
    );
  },
};

/** useImageUploader hook 직접 사용 예시 */
export const HeadlessHookUsage: Story = {
  render: () => {
    // 실제 코드에서는 useImageUploader를 직접 import해서 사용해요:
    // import { useImageUploader } from '@poodle-kit/ui';
    return (
      <div className="p-4 rounded-lg border border-border bg-muted">
        <p className="text-sm text-muted-foreground mb-2">
          <code className="text-xs bg-background px-1 py-0.5 rounded">
            useImageUploader
          </code>{' '}
          hook으로 UI를 완전히 커스텀할 수 있어요.
        </p>
        <ImageUploader
          placeholder={
            <span className="text-[11px] font-semibold text-primary">
              드래그
              <br />
              or 클릭
            </span>
          }
        />
      </div>
    );
  },
};
