# @poodle-kit/ui

TypeScript와 Tailwind CSS로 만든 React UI 컴포넌트 라이브러리예요.

## 📦 설치하기

```bash
npm install @poodle-kit/ui
```

### 같이 필요한 패키지들

```bash
npm install react@">=18" react-dom@">=18"
```

## 💡 사용 방법

### 기본 예제

```tsx
import { Button } from '@poodle-kit/ui';
import '@poodle-kit/ui/styles.css';

function App() {
  return (
    <Button
      label="클릭해주세요"
      variant="primary"
      onClick={() => alert('클릭했어요!')}
    />
  );
}
```

### TypeScript와 함께 사용하기

```tsx
import { Button, ButtonProps } from '@poodle-kit/ui';
import '@poodle-kit/ui/styles.css';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## 🎨 컴포넌트

### Button

다양한 스타일과 크기를 지원하는 버튼 컴포넌트예요.

#### Props

| Prop        | 타입                                              | 기본값      | 설명                            |
| ----------- | ------------------------------------------------- | ----------- | ------------------------------- |
| `label`     | `string`                                          | -           | 버튼에 표시될 텍스트 **(필수)** |
| `variant`   | `"primary" \| "secondary" \| "ghost" \| "danger"` | `"primary"` | 버튼의 스타일 종류              |
| `size`      | `"sm" \| "md" \| "lg"`                            | `"md"`      | 버튼의 크기                     |
| `fullWidth` | `boolean`                                         | `false`     | 버튼을 전체 너비로 만들기       |
| `disabled`  | `boolean`                                         | `false`     | 버튼 비활성화하기               |
| `onClick`   | `() => void`                                      | -           | 클릭 이벤트 핸들러              |

일반적인 HTML button 속성들도 모두 사용할 수 있어요.

#### 예제

**다양한 스타일**

```tsx
<Button label="Primary" variant="primary" />
<Button label="Secondary" variant="secondary" />
<Button label="Ghost" variant="ghost" />
<Button label="Danger" variant="danger" />
```

**다양한 크기**

```tsx
<Button label="작아요" size="sm" />
<Button label="보통이에요" size="md" />
<Button label="커요" size="lg" />
```

**전체 너비로 만들기**

```tsx
<Button label="전체 너비 버튼" fullWidth />
```

**비활성화 상태**

```tsx
<Button label="비활성화된 버튼" disabled />
```

## 🎨 스타일링

이 라이브러리는 Tailwind CSS를 사용해요. 스타일을 꼭 import 해주세요:

```tsx
import '@poodle-kit/ui/styles.css';
```

### 커스텀 스타일 적용하기

className을 통해 추가 스타일을 적용할 수 있어요:

```tsx
<Button label="커스텀" className="my-custom-class" />
```

## 🔧 TypeScript 지원

TypeScript로 작성되어 완벽한 타입 정의를 제공해요.

```tsx
import type { ButtonProps } from '@poodle-kit/ui';
```

## 🌐 브라우저 지원

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)

## 🛠️ 개발하기

### 빌드

```bash
npm run build
```

### Watch 모드

```bash
npm run dev
```

## 📦 리포지토리

[GitHub](https://github.com/poodle-kit/poodle-kit/tree/main/packages/ui)

## 📄 라이선스

MIT
