export type ToastType =
  | 'default'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface Toast {
  id: string;
  /** 토스트 제목 (필수) */
  title: string;
  /** 부가 설명 (선택) */
  description?: string;
  /** 좌측 커스텀 아이콘. 없으면 type 아이콘으로 대체 */
  icon?: React.ReactNode;
  type?: ToastType;
  /** ms. Infinity = 수동 닫기. 기본값: defaultDuration */
  duration?: number;
  /** 생성 시각 (Date.now()). 숨겨졌다 다시 나타날 때 남은 시간 계산에 사용 */
  createdAt: number;
  /** true 일 때만 닫기 버튼 표시 */
  dismissible?: boolean;
}

export interface ToastOptions {
  duration?: number;
  type?: ToastType;
  description?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
}

export interface ToasterProps {
  /** 기본값: 'bottom-right' */
  position?: ToastPosition;
  /** 동시 표시 최대 개수. 기본값: 5 */
  maxToasts?: number;
  /** 자동 소멸 시간(ms). 기본값: 4000 */
  defaultDuration?: number;
}
