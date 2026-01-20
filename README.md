# 🐶 Poodle Kit

TypeScript와 Tailwind CSS로 만든 React UI 컴포넌트 라이브러리예요.

## 📦 패키지

| 패키지                          | 버전  | 설명                                |
| ------------------------------- | ----- | ----------------------------------- |
| [@poodle-kit/ui](./packages/ui) | 0.1.0 | Tailwind CSS 기반 React UI 컴포넌트 |

## 🚀 빠른 시작

### 설치하기

#### npm

```bash
npm install @poodle-kit/ui
```

#### pnpm

```bash
pnpm install @poodle-kit/ui
```

### 사용하기

```tsx
import { Button } from "@poodle-kit/ui";
import "@poodle-kit/ui/styles.css";

function App() {
  return <Button label="클릭해주세요" variant="primary" size="md" />;
}
```

## 🛠️ 개발 환경

### 필요한 것들

- Node.js >= 18
- npm >= 9

### 시작하기

```bash
# 의존성 설치하기
npm install

# 모든 패키지 빌드하기
npm run build

# Storybook 실행하기
npm run storybook
```

### 프로젝트 구조

```
poodle-kit/
├── packages/
│   └── ui/                 # @poodle-kit/ui
│       ├── src/
│       │   ├── components/ # React 컴포넌트들
│       │   ├── tailwind.css
│       │   └── index.ts
│       ├── dist/           # 빌드 결과물
│       └── package.json
├── .storybook/             # Storybook 설정
├── package.json            # Workspace 루트
└── README.md
```

## 📝 스크립트

```bash
# 모든 패키지 빌드하기
npm run build

# Watch 모드로 개발하기 (모든 패키지)
npm run dev

# Storybook 실행하기
npm run storybook

# Storybook 빌드하기
npm run build-storybook
```

## 🚢 배포하기

각 패키지를 독립적으로 배포할 수 있어요:

```bash
cd packages/ui
npm version patch  # 또는 minor, major
npm publish --access public
```

## 🔗 링크

- [npm Organization](https://www.npmjs.com/org/poodle-kit)
- [GitHub Repository](https://github.com/poodle-kit/poodle-kit)
- 문서 사이트 배포는 추후 진행 예정이에요

## 📄 라이선스

MIT 라이센스를 따르고 있어요
