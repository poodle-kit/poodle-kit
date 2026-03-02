'use client';

import { AnimatePresence, motion } from 'motion/react';

/**
 * formPreset - 폼 입력 요소에 적합한 애니메이션 프리셋
 *
 * 적용 대상: Input, Textarea, Select 등 폼 요소
 */
export const formPreset = {
  /**
   * Message 슬롯 - 에러/헬프 메시지를 감싸는 애니메이션 래퍼
   * message가 나타날 때 fade + slide 효과
   */
  Message: ({ children }: { children: React.ReactNode }) => (
    <AnimatePresence mode="wait">
      {children && (
        <motion.div
          key="message"
          initial={{ opacity: 0, height: 0, y: -4 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          exit={{ opacity: 0, height: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  ),
};
