import { createContext } from 'react';

/**
 * 애니메이션 슬롯 타입
 * UI 컴포넌트가 사용할 수 있는 래퍼 컴포넌트들을 정의
 */
type AnimateSlots = {
  Root: React.FC<{ children: React.ReactNode }>;
};

/** 애니메이션 없이 children만 반환하는 기본 래퍼 */
const noop = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

/**
 * AnimateContext
 * - UI 컴포넌트는 이 Context에서 애니메이션 래퍼를 가져다 씀
 * - Provider가 없으면 기본값 noop
 */
export const AnimateContext = createContext<AnimateSlots>({
  Root: noop,
});
