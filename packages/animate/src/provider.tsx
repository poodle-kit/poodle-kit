'use client';

import { AnimateContext } from './context';
import { formPreset } from './presets/form';
import { pressPreset } from './presets/press';
import type { AnimatePreset } from './presets/types';

/** 애니메이션 없이 children만 반환하는 기본 래퍼 */
const noop = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

/**
 * 프리셋 이름 → 실제 슬롯 매핑
 * 새 프리셋 추가 시 여기에 등록
 */
const defaults = { Root: noop, Message: noop };

const PRESETS = {
  none: defaults,
  press: { ...defaults, ...pressPreset },
  form: { ...defaults, ...formPreset },
};

/**
 * AnimateProvider - 애니메이션 프리셋을 Context에 주입하는 Provider
 *
 * @param preset - 적용할 프리셋 이름 ('none' | 'press')
 * @param children - 하위 컴포넌트
 *
 */
export function AnimateProvider({
  preset = 'none',
  children,
}: {
  preset?: AnimatePreset;
  children: React.ReactNode;
}) {
  return (
    <AnimateContext.Provider value={PRESETS[preset]}>
      {children}
    </AnimateContext.Provider>
  );
}
