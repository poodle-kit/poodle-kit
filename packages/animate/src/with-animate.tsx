'use client';

import { useContext } from 'react';
import { AnimateContext } from './context';
import { AnimateProvider } from './provider';
import type { AnimatePreset } from './presets/types';

/**
 * Root 슬롯을 Context에서 읽어서 children을 감싸는 내부 컴포넌트
 * AnimateProvider 안에서 렌더되어야 Context에 접근 가능
 */
function RootSlot({ children }: { children: React.ReactNode }) {
  const { Root } = useContext(AnimateContext);
  return <Root>{children}</Root>;
}

/**
 * withAnimate - 컴포넌트에 애니메이션 Root 슬롯을 주입하는 HOC
 *
 * 내부적으로 AnimateProvider → RootSlot → Component 순으로 감싸서
 * 프리셋의 Root 슬롯이 실제로 적용된다.
 *
 * @example
 * const PressButton = withAnimate(Button, 'press');
 * <PressButton>클릭</PressButton>
 * // → pressPreset.Root(motion.div whileTap)가 Button을 감쌈
 */
export function withAnimate<P extends object>(
  Component: React.ComponentType<P>,
  preset: AnimatePreset = 'none',
) {
  const Wrapped = (props: P) => (
    <AnimateProvider preset={preset}>
      <RootSlot>
        <Component {...props} />
      </RootSlot>
    </AnimateProvider>
  );

  Wrapped.displayName = `withAnimate(${Component.displayName || Component.name})`;
  return Wrapped;
}
