import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/components/button/button.tsx',
    'src/components/image-uploader/image-uploader.tsx',
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
  onSuccess: 'cp -r src/theme/*.css dist/theme/',
});
