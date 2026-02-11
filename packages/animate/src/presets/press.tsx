'use client';

import { motion } from 'motion/react';

/**
 * pressPreset - 클릭/탭 시 눌리는 효과를 주는 프리셋
 *
 * 적용 대상: Button, Card, 클릭 가능한 요소
 *
 * 동작:
 * - whileTap: 누르는 동안 95% 크기로 축소
 * - transition: 0.1초 동안 애니메이션
 */
export const pressPreset = {
  /**
   * Root 슬롯 - 컴포넌트 전체를 감싸는 애니메이션 래퍼
   */
  Root: ({ children }: { children: React.ReactNode }) => (
    <motion.div
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.div>
  ),
};
