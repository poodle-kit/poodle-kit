'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type React from 'react';

// ─── Public Types ────────────────────────────────────────────────────────────

/** 서버에서 받은 기존 이미지 */
export interface ExistingImage {
  id: number | string;
  url: string;
  /** 이미지 순서 (정렬에 사용) */
  sequence?: number;
}

/** 새로 선택한 파일 (미리보기 포함) */
export interface NewImageFile {
  file: File;
  /** `URL.createObjectURL()` 로 생성된 미리보기 URL */
  preview: string;
  /** React key / 삭제 식별자 */
  id: string;
}

/** 유효성 검사 에러 Union 타입 */
export type ImageUploaderError =
  | { type: 'MAX_IMAGES'; message: string; maxImages: number }
  | {
      type: 'MAX_SIZE';
      message: string;
      maxSizeMb: number;
      file: File;
    }
  | {
      type: 'INVALID_TYPE';
      message: string;
      file: File;
      accept: string;
    };

export interface UseImageUploaderOptions {
  /** 수정 모드에서 서버 이미지를 전달해요 */
  initialImages?: ExistingImage[];
  /** 최대 업로드 가능 이미지 수 (기본값: 4) */
  maxImages?: number;
  /** 파일 1개의 최대 크기 (MB). 미설정 시 제한 없음 */
  maxSizeMb?: number;
  /** 허용할 파일 형식 (기본값: 'image/*') */
  accept?: string;
  /** 현재 선택된 전체 File[] 배열이 변경될 때 호출돼요 */
  onFileSelect?: (files: File[]) => void;
  /** 기존 이미지가 삭제될 때 삭제된 id 배열을 전달해요 */
  onDeleteExisting?: (deletedIds: Array<number | string>) => void;
  /** 유효성 검사 실패 시 호출돼요 (toast 등 직접 처리) */
  onError?: (error: ImageUploaderError) => void;
}

export interface UseImageUploaderReturn {
  /** 삭제되지 않은 기존 이미지 */
  existingImages: ExistingImage[];
  /** 새로 선택한 이미지 (미리보기 포함) */
  newImages: NewImageFile[];
  /** 기존 + 새 이미지 합산 개수 */
  totalCount: number;
  /** 드래그 활성 여부 */
  isDragActive: boolean;
  /** 파일 input 요소의 ref */
  inputRef: React.RefObject<HTMLInputElement>;
  /** 파일 선택 다이얼로그 열기 */
  openFilePicker: () => void;
  /** 기존 이미지 삭제 */
  removeExisting: (id: number | string) => void;
  /** 새로 선택한 이미지 삭제 */
  removeNew: (id: string) => void;
  /** drop zone에 spread할 drag 이벤트 핸들러 */
  dragHandlers: {
    onDragOver: React.DragEventHandler;
    onDragLeave: React.DragEventHandler;
    onDrop: React.DragEventHandler;
  };
  /** file input에 spread할 props */
  inputProps: {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    accept: string;
    multiple: boolean;
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function matchesAccept(file: File, accept: string): boolean {
  return accept
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .some((pattern) => {
      if (pattern === '*' || pattern === '*/*') return true;
      if (pattern.startsWith('.'))
        return file.name.toLowerCase().endsWith(pattern);
      if (pattern.endsWith('/*'))
        return file.type.startsWith(pattern.slice(0, -2));
      return file.type === pattern;
    });
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useImageUploader({
  initialImages,
  maxImages = 4,
  maxSizeMb,
  accept = 'image/*',
  onFileSelect,
  onDeleteExisting,
  onError,
}: UseImageUploaderOptions): UseImageUploaderReturn {
  const [newImages, setNewImages] = useState<NewImageFile[]>([]);
  const [deletedIds, setDeletedIds] = useState<
    Array<number | string>
  >([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 콜백 refs — 매 렌더 후 갱신해 stale closure 없이 최신 값 참조
  const onFileSelectRef = useRef(onFileSelect);
  const onDeleteExistingRef = useRef(onDeleteExisting);
  const onErrorRef = useRef(onError);
  useEffect(() => {
    onFileSelectRef.current = onFileSelect;
    onDeleteExistingRef.current = onDeleteExisting;
    onErrorRef.current = onError;
  });

  // 상태 refs — 콜백 내에서 최신 상태를 직접 읽기 위해 사용
  const newImagesRef = useRef<NewImageFile[]>([]);
  const deletedIdsRef = useRef<Array<number | string>>([]);
  const existingCountRef = useRef(0);

  const existingImages = useMemo(
    () =>
      (initialImages ?? []).filter(
        (img) => !deletedIds.includes(img.id),
      ),
    [initialImages, deletedIds],
  );

  // 렌더 후 refs 동기화
  useEffect(() => {
    newImagesRef.current = newImages;
  }, [newImages]);
  useEffect(() => {
    deletedIdsRef.current = deletedIds;
  }, [deletedIds]);
  useEffect(() => {
    existingCountRef.current = existingImages.length;
  }, [existingImages.length]);

  // 언마운트 시 모든 preview URL 해제
  useEffect(() => {
    return () => {
      newImagesRef.current.forEach((item) =>
        URL.revokeObjectURL(item.preview),
      );
    };
  }, []);

  const processFiles = useCallback(
    (files: File[]) => {
      const currentTotal =
        existingCountRef.current + newImagesRef.current.length;
      const onErr = onErrorRef.current;
      const onSelect = onFileSelectRef.current;

      if (currentTotal >= maxImages) {
        onErr?.({
          type: 'MAX_IMAGES',
          message: `이미지는 최대 ${maxImages}장까지 추가할 수 있어요.`,
          maxImages,
        });
        return;
      }

      const remainingSlots = maxImages - currentTotal;

      if (files.length > remainingSlots) {
        onErr?.({
          type: 'MAX_IMAGES',
          message: `이미지는 최대 ${maxImages}장까지 추가할 수 있어요.`,
          maxImages,
        });
      }

      const validFiles: NewImageFile[] = [];

      for (const file of files.slice(0, remainingSlots)) {
        if (!matchesAccept(file, accept)) {
          onErr?.({
            type: 'INVALID_TYPE',
            message: `지원하지 않는 파일 형식이에요.`,
            file,
            accept,
          });
          continue;
        }

        if (
          maxSizeMb !== undefined &&
          file.size > maxSizeMb * 1024 * 1024
        ) {
          onErr?.({
            type: 'MAX_SIZE',
            message: `${file.name}의 크기가 ${maxSizeMb}MB를 초과해요.`,
            maxSizeMb,
            file,
          });
          continue;
        }

        validFiles.push({
          file,
          preview: URL.createObjectURL(file),
          id: crypto.randomUUID(),
        });
      }

      if (validFiles.length === 0) return;

      const next = [...newImagesRef.current, ...validFiles];
      newImagesRef.current = next;
      setNewImages(next);
      onSelect?.(next.map((item) => item.file));
    },
    [maxImages, accept, maxSizeMb],
  );

  const removeExisting = useCallback((id: number | string) => {
    const next = [...deletedIdsRef.current, id];
    deletedIdsRef.current = next;
    setDeletedIds(next);
    onDeleteExistingRef.current?.(next);
  }, []);

  const removeNew = useCallback((id: string) => {
    const current = newImagesRef.current;
    const toRemove = current.find((item) => item.id === id);
    if (toRemove) URL.revokeObjectURL(toRemove.preview);
    const next = current.filter((item) => item.id !== id);
    newImagesRef.current = next;
    setNewImages(next);
    onFileSelectRef.current?.(next.map((item) => item.file));
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      processFiles(Array.from(e.target.files));
      e.target.value = '';
    },
    [processFiles],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // 자식 요소로 이동하는 경우는 무시
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      processFiles(Array.from(e.dataTransfer.files));
    },
    [processFiles],
  );

  return {
    existingImages,
    newImages,
    totalCount: existingImages.length + newImages.length,
    isDragActive,
    inputRef,
    openFilePicker: () => inputRef.current?.click(),
    removeExisting,
    removeNew,
    dragHandlers: {
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    },
    inputProps: {
      onChange: handleChange,
      accept,
      multiple: true,
    },
  };
}
