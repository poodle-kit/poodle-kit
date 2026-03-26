import { defineConfig } from 'tsup';
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/components/button/button.tsx',
    'src/components/image-uploader/image-uploader.tsx',
    'src/components/select/select.tsx',
    'src/theme/index.ts',
    'src/lib/cn.ts',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  loader: {
    '.css': 'css',
  },
  onSuccess: async () => {
    const destDir = join('dist', 'theme');
    if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });
    copyFileSync(
      join('src', 'theme', 'theme.css'),
      join(destDir, 'theme.css'),
    );
  },
});
