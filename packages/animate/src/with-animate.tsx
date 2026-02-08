'use client';

import { AnimateProvider } from './provider';
import type { AnimatePreset } from './presets/types';

/**
 * withAnimate - 컴포넌트에 애니메이션을 주입하는 HOC
 *
 * @param Component - 애니메이션을 적용할 원본 컴포넌트
 * @param preset - 적용할 애니메이션 프리셋 ('none' | 'press')
 * @returns 애니메이션이 주입된 새 컴포넌트
 *
 * @example
 * const PressButton = withAnimate(Button, 'press');
 * <PressButton>클릭</PressButton>
 */
export function withAnimate<P extends object>(
  Component: React.ComponentType<P>,
  preset: AnimatePreset = 'none',
) {
  // AnimateProvider로 감싸서 Context에 preset 주입
  const Wrapped = (props: P) => (
    <AnimateProvider preset={preset}>
      <Component {...props} />
    </AnimateProvider>
  );

  // React DevTools에서 withAnimate(Button)으로 표시
  Wrapped.displayName = `withAnimate(${Component.displayName || Component.name})`;
  return Wrapped;
}
