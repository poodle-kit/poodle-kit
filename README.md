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
import { Button } from '@poodle-kit/ui';
import '@poodle-kit/ui/styles.css';

function App() {
  return <Button label="클릭해주세요" variant="primary" size="md" />;
}
```

## 🛠️ 개발 환경

### 필요한 것들

- Node.js >= 18
- pnpm >= 10 (권장)

### 시작하기

```bash
# pnpm 설치 (전역)
npm install -g pnpm

# 의존성 설치하기
pnpm install

# 모든 패키지 빌드하기 (Turborepo 캐싱)
pnpm build

# Watch 모드로 개발하기
pnpm dev

# Storybook 실행하기
pnpm storybook
```

### 주요 도구

- 🚀 **Turborepo** - 빌드 캐싱 및 병렬 처리
- 📦 **pnpm** - 빠르고 효율적인 패키지 매니저
- 🎨 **Tailwind CSS** - 유틸리티 기반 CSS 프레임워크
- 📚 **Storybook** - 컴포넌트 개발 환경

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
# 모든 패키지 빌드하기 (Turborepo 캐싱)
pnpm build

# Watch 모드로 개발하기 (모든 패키지)
pnpm dev

# 타입 체크
pnpm typecheck

# Lint 검사
pnpm lint

# Lint 자동 수정
pnpm lint:fix

# 코드 포맷팅
pnpm format

# Storybook 실행하기
pnpm storybook

# Storybook 빌드하기
pnpm build-storybook

# 캐시 및 node_modules 정리
pnpm clean
```

## 🚢 배포하기

각 패키지를 독립적으로 배포할 수 있어요:

```bash
cd packages/ui

# 빌드
pnpm build

# 버전 업데이트
npm version patch  # 또는 minor, major

# 배포
npm publish --access public
```

## 🔗 링크

- [npm Organization](https://www.npmjs.com/org/poodle-kit)
- [GitHub Repository](https://github.com/poodle-kit/poodle-kit)
- 문서 사이트 배포는 추후 진행 예정이에요

## 📄 라이선스

MIT 라이센스를 따르고 있어요
