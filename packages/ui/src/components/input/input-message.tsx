import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface InputMessageProps {
  /** 표시할 메시지 텍스트 */
  children: ReactNode;
  /** true이면 빨간색(에러), false/undefined이면 회색(도움말) */
  error?: boolean;
  className?: string;
}

/**
 * InputMessage — Input 하단에 표시되는 에러/헬프 메시지 컴포넌트
 *
 * Input과 분리된 별도 컴포넌트로, 애니메이션이 필요하면
 * 이 컴포넌트를 motion.div로 감싸서 사용한다.
 *
 * @example
 * // 기본 사용
 * <InputMessage error>올바른 이메일을 입력해주세요.</InputMessage>
 * <InputMessage>8자 이상 입력해주세요.</InputMessage>
 *
 * // 애니메이션 적용
 * <AnimatePresence>
 *   {error && (
 *     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
 *       <InputMessage error>{error}</InputMessage>
 *     </motion.div>
 *   )}
 * </AnimatePresence>
 */
export function InputMessage({
  children,
  error,
  className,
}: InputMessageProps) {
  return (
    <p
      className={cn(
        'text-xs',
        error ? 'text-danger' : 'text-muted-foreground',
        className,
      )}
    >
      {children}
    </p>
  );
}
