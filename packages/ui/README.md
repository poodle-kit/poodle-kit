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

### Input

라벨, 아이콘, 유효성 상태를 지원하는 입력 컴포넌트예요.

#### Props

| Prop               | 타입                            | 기본값      | 설명                              |
| ------------------ | ------------------------------- | ----------- | --------------------------------- |
| `label`            | `string`                        | -           | 입력 필드 위에 표시될 라벨        |
| `size`             | `"default" \| "sm" \| "lg"`     | `"default"` | 입력 필드의 크기                  |
| `error`            | `boolean`                       | `false`     | 에러 상태 (빨간 테두리)           |
| `success`          | `boolean`                       | `false`     | 성공 상태 (초록 테두리)           |
| `leftIcon`         | `ReactNode`                     | -           | 좌측 아이콘                       |
| `rightIcon`        | `ReactNode`                     | -           | 우측 아이콘                       |
| `onLeftIconClick`  | `() => void`                    | -           | 좌측 아이콘 클릭 핸들러           |
| `onRightIconClick` | `() => void`                    | -           | 우측 아이콘 클릭 핸들러           |
| `inputClassName`   | `string`                        | -           | input 요소에만 적용할 className   |

일반적인 HTML input 속성들도 모두 사용할 수 있어요.

#### 예제

```tsx
import { Input } from '@poodle-kit/ui';

// 기본 사용
<Input label="이름" placeholder="이름을 입력해주세요" />

// 에러 상태
<Input label="이메일" error placeholder="이메일을 입력해주세요" />

// 성공 상태
<Input label="닉네임" success defaultValue="poodle" />

// 아이콘 포함
<Input leftIcon={<SearchIcon />} placeholder="검색" />
```

---

### Select

드롭다운 선택 컴포넌트예요. Compound 패턴으로 구성되어 있어요.

#### 구성 요소

- `Select` — 루트 컨텍스트 제공
- `SelectTrigger` — 드롭다운을 여는 버튼
- `SelectValue` — 선택된 값을 표시
- `SelectContent` — 드롭다운 목록 컨테이너
- `SelectGroup` — 옵션 그룹 (선택 사항)
- `SelectItem` — 개별 옵션

#### Select Props

| Prop            | 타입                     | 기본값          | 설명                        |
| --------------- | ------------------------ | --------------- | --------------------------- |
| `value`         | `string`                 | -               | 제어 컴포넌트용 선택값      |
| `defaultValue`  | `string`                 | -               | 비제어 컴포넌트용 초기값    |
| `onValueChange` | `(value: string) => void`| -               | 값 변경 핸들러              |
| `open`          | `boolean`                | -               | 제어 컴포넌트용 열림 상태   |
| `defaultOpen`   | `boolean`                | `false`         | 비제어 초기 열림 상태       |
| `onOpenChange`  | `(open: boolean) => void`| -               | 열림 상태 변경 핸들러       |
| `disabled`      | `boolean`                | `false`         | 전체 비활성화               |
| `placement`     | `Placement`              | `"bottom-start"`| 드롭다운 위치               |

#### 예제

```tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@poodle-kit/ui';

<Select onValueChange={(val) => console.log(val)}>
  <SelectTrigger>
    <SelectValue placeholder="선택해주세요" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">사과</SelectItem>
    <SelectItem value="banana">바나나</SelectItem>
    <SelectItem value="orange">오렌지</SelectItem>
  </SelectContent>
</Select>
```

---

### Toast

명령형 API로 토스트 알림을 띄우는 컴포넌트예요.

#### 설정

앱 루트에 `Toaster`를 추가해주세요:

```tsx
import { Toaster } from '@poodle-kit/ui';

function App() {
  return (
    <>
      <YourApp />
      <Toaster position="bottom-right" />
    </>
  );
}
```

#### Toaster Props

| Prop              | 타입            | 기본값           | 설명                      |
| ----------------- | --------------- | ---------------- | ------------------------- |
| `position`        | `ToastPosition` | `"bottom-right"` | 토스트 표시 위치          |
| `maxToasts`       | `number`        | `5`              | 동시 표시 최대 개수       |
| `defaultDuration` | `number`        | `4000`           | 자동 소멸 시간 (ms)       |

#### toast() API

```tsx
import { toast } from '@poodle-kit/ui';

toast('저장됐어요!');
toast.success('성공했어요!');
toast.error('오류가 발생했어요.', { description: '다시 시도해주세요.' });
toast.warning('주의가 필요해요.');
toast.info('새로운 업데이트가 있어요.', { dismissible: true });

// 반환된 id로 수동 제거
const id = toast('처리 중이에요...', { duration: Infinity });
toast.dismiss(id);
```

| 타입        | 메서드           |
| ----------- | ---------------- |
| `default`   | `toast(title)`   |
| `success`   | `toast.success`  |
| `error`     | `toast.error`    |
| `warning`   | `toast.warning`  |
| `info`      | `toast.info`     |
| 수동 제거   | `toast.dismiss(id)` |

---

### ImageUploader

이미지 업로드 UI 컴포넌트예요. 드래그 앤 드롭과 파일 선택을 모두 지원해요.

#### Props

| Prop               | 타입                                       | 기본값  | 설명                              |
| ------------------ | ------------------------------------------ | ------- | --------------------------------- |
| `initialImages`    | `ExistingImage[]`                          | -       | 서버에서 불러온 기존 이미지 목록  |
| `maxImages`        | `number`                                   | `4`     | 최대 업로드 가능 개수             |
| `maxSizeMb`        | `number`                                   | -       | 파일 최대 크기 (MB)               |
| `accept`           | `string`                                   | -       | 허용할 파일 MIME 타입             |
| `layout`           | `"row" \| "grid"`                          | `"row"` | 이미지 목록 레이아웃              |
| `disabled`         | `boolean`                                  | `false` | 모든 인터랙션 비활성화            |
| `placeholder`      | `ReactNode`                                | -       | 추가 버튼 커스텀 내용             |
| `onFileSelect`     | `(files: NewImageFile[]) => void`          | -       | 새 파일 선택 시 호출              |
| `onDeleteExisting` | `(id: string \| number) => void`           | -       | 기존 이미지 삭제 시 호출          |
| `onError`          | `(error: ImageUploaderError) => void`      | -       | 에러 발생 시 호출                 |

#### 예제

```tsx
import { ImageUploader } from '@poodle-kit/ui';

<ImageUploader
  maxImages={5}
  maxSizeMb={10}
  onFileSelect={(files) => console.log(files)}
  onDeleteExisting={(id) => console.log('삭제:', id)}
  onError={(err) => console.error(err)}
/>
```

고급 커스텀이 필요하면 `useImageUploader` hook을 직접 사용할 수 있어요:

```tsx
import { useImageUploader } from '@poodle-kit/ui';
```

---

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
