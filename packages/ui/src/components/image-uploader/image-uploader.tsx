'use client';

import { forwardRef, useId } from 'react';
import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';
import { PlusIcon, XIcon } from '../../icons';
import {
  useImageUploader,
  type ExistingImage,
  type NewImageFile,
  type UseImageUploaderOptions,
} from './use-image-uploader';

// ─── CVA Variants ─────────────────────────────────────────────────────────────

const imageUploaderVariants = cva('flex gap-2', {
  variants: {
    layout: {
      /** 가로 스크롤 행 (기본값) */
      row: 'flex-row flex-nowrap overflow-x-auto',
      /** 자동 줄바꿈 격자 */
      grid: 'flex-wrap',
    },
  },
  defaultVariants: { layout: 'row' },
});

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ImageUploaderProps
  extends
    UseImageUploaderOptions,
    VariantProps<typeof imageUploaderVariants> {
  className?: string;
  /** true이면 모든 인터랙션을 비활성화해요 */
  disabled?: boolean;
  /**
   * 이미지 추가 버튼의 내용을 교체할 수 있어요.
   * 기본값은 + 아이콘과 현재/최대 개수를 표시해요.
   */
  placeholder?: ReactNode;
}

// ─── Private Sub-components ──────────────────────────────────────────────────

interface AddButtonProps {
  onClick: () => void;
  disabled?: boolean;
  current: number;
  max: number;
  children?: ReactNode;
}

function AddButton({
  onClick,
  disabled,
  current,
  max,
  children,
}: AddButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`이미지 추가 (${current}/${max})`}
      className={cn(
        'shrink-0 w-20 h-20',
        'flex flex-col items-center justify-center gap-1',
        'rounded-lg',
        'border-2 border-dashed border-border',
        'bg-muted text-muted-foreground',
        'cursor-pointer select-none',
        'transition-colors duration-150',
        'hover:bg-accent hover:text-accent-foreground hover:border-border',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
      )}
    >
      {children ?? (
        <>
          <PlusIcon className="w-5 h-5" />
          <span className="text-[10px] font-medium leading-none tabular-nums">
            {current}/{max}
          </span>
        </>
      )}
    </button>
  );
}

interface ImageItemProps {
  src: string;
  alt: string;
  onRemove: () => void;
  disabled?: boolean;
}

function ImageItem({ src, alt, onRemove, disabled }: ImageItemProps) {
  return (
    <div className="relative shrink-0 w-20 h-20 group/item">
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="w-full h-full object-cover rounded-lg"
      />
      {!disabled && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`${alt} 삭제`}
          className={cn(
            'absolute -top-1.5 -right-1.5',
            'w-5 h-5 rounded-full',
            'flex items-center justify-center',
            'bg-foreground text-background',
            'transition-all duration-150',
            'opacity-0 scale-75',
            'group-hover/item:opacity-100 group-hover/item:scale-100',
            'group-focus-within/item:opacity-100 group-focus-within/item:scale-100',
            'hover:scale-110 active:scale-90',
            'focus-visible:opacity-100 focus-visible:scale-100',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
          )}
        >
          <XIcon strokeWidth="2.5" />
        </button>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export const ImageUploader = forwardRef<
  HTMLDivElement,
  ImageUploaderProps
>(
  (
    {
      className,
      layout,
      disabled,
      placeholder,
      initialImages,
      maxImages = 4,
      maxSizeMb,
      accept,
      onFileSelect,
      onDeleteExisting,
      onError,
    },
    ref,
  ) => {
    const uid = useId();

    const {
      existingImages,
      newImages,
      totalCount,
      isDragActive,
      inputRef,
      openFilePicker,
      removeExisting,
      removeNew,
      dragHandlers,
      inputProps,
    } = useImageUploader({
      initialImages,
      maxImages,
      maxSizeMb,
      accept,
      onFileSelect,
      onDeleteExisting,
      onError,
    });

    const canAdd = !disabled && totalCount < maxImages;

    return (
      <div ref={ref} className={cn('flex flex-col gap-2', className)}>
        {/* Screen reader live region — count 변경 시 자동 공지 */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {totalCount > 0
            ? `이미지 ${totalCount}개 선택됨. 최대 ${maxImages}개까지 추가할 수 있어요.`
            : `이미지를 추가해주세요. 최대 ${maxImages}개까지 추가할 수 있어요.`}
        </div>

        {/* Drag 활성 시 screen reader 긴급 공지 */}
        {isDragActive && (
          <span role="alert" className="sr-only">
            파일을 여기에 놓아주세요
          </span>
        )}

        {/* 숨겨진 파일 input (탭 순서에서 제외, 버튼이 대신 처리) */}
        <input
          ref={inputRef}
          id={`${uid}-input`}
          type="file"
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
          disabled={disabled}
          {...inputProps}
        />

        {/* Drop zone + 이미지 목록 */}
        <div
          role="group"
          aria-label={`이미지 업로더, ${totalCount}/${maxImages}개 선택됨`}
          className={cn(
            imageUploaderVariants({ layout }),
            'rounded-lg p-1 -ml-1',
            'transition-all duration-200',
            isDragActive &&
              'ring-2 ring-primary ring-offset-2 bg-primary/5',
          )}
          {...(canAdd ? dragHandlers : {})}
        >
          {/* 이미지 추가 버튼 */}
          {canAdd && (
            <AddButton
              onClick={openFilePicker}
              disabled={disabled}
              current={totalCount}
              max={maxImages}
            >
              {placeholder}
            </AddButton>
          )}

          {/* 기존 이미지 (sequence 순 정렬) */}
          {sortBySequence(existingImages).map((img, index) => (
            <ImageItem
              key={`existing-${img.id}`}
              src={img.url}
              alt={`이미지 ${index + 1}`}
              onRemove={() => removeExisting(img.id)}
              disabled={disabled}
            />
          ))}

          {/* 새로 선택한 이미지 */}
          {newImages.map((item, index) => (
            <ImageItem
              key={`new-${item.id}`}
              src={item.preview}
              alt={`새 이미지 ${existingImages.length + index + 1}`}
              onRemove={() => removeNew(item.id)}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    );
  },
);

ImageUploader.displayName = 'ImageUploader';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sortBySequence(images: ExistingImage[]): ExistingImage[] {
  return [...images].sort(
    (a, b) => (a.sequence ?? 0) - (b.sequence ?? 0),
  );
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export { imageUploaderVariants };
export type { ExistingImage, NewImageFile };
