'use client';

import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';

/**
 * AnimatedMessage — 메시지의 등장/퇴장에 fade + slide 애니메이션을 적용하는 래퍼
 *
 * children이 있으면 fade+slide로 나타나고,
 * children이 없으면(null/undefined/false) AnimatePresence가 exit 애니메이션을 실행한다.
 *
 * @example
 * <AnimatedMessage>
 *   {error && <InputMessage error>{error}</InputMessage>}
 * </AnimatedMessage>
 */
export function AnimatedMessage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AnimatePresence>
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
  );
}
