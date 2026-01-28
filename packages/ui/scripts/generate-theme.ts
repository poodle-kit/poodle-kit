import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { defaultTheme } from '../src/theme/tokens/presets/default';
import { defaultDarkTheme } from '../src/theme/tokens/presets/default-dark';
import { brandATheme } from '../src/theme/tokens/presets/brand-a';
import { brandBTheme } from '../src/theme/tokens/presets/brand-b';
import {
  generateThemeFile,
  type CustomTheme,
} from '../src/theme/generate-css';

const outputPath = resolve(
  __dirname,
  '../src/theme/theme.generated.css',
);

console.log('🎨 Generating theme CSS...\n');

try {
  const customThemes: CustomTheme[] = [
    {
      name: 'Brand A',
      className: 'theme-brand-a',
      config: brandATheme,
      description: 'Green/Yellow theme',
    },
    {
      name: 'Brand B',
      className: 'theme-brand-b',
      config: brandBTheme,
      description: 'Red/Purple theme',
    },
  ];

  const css = generateThemeFile(
    defaultTheme,
    defaultDarkTheme,
    customThemes,
  );

  writeFileSync(outputPath, css, 'utf-8');

  console.log('✅ Theme CSS generated successfully!');
  console.log(`📁 Output: ${outputPath}`);
  console.log(`📊 Size: ${(css.length / 1024).toFixed(2)} KB\n`);

  const lightTokenCount = defaultTheme.colors
    ? Object.keys(defaultTheme.colors).length
    : 0;
  const darkTokenCount = defaultDarkTheme.colors
    ? Object.keys(defaultDarkTheme.colors).length
    : 0;

  console.log('📋 Token Summary:');
  console.log(`   Light mode: ${lightTokenCount} color tokens`);
  console.log(`   Dark mode: ${darkTokenCount} color tokens`);
  console.log(`   Custom themes: ${customThemes.length}`);
} catch (error) {
  console.error('❌ Failed to generate theme CSS:');
  console.error(error);
  process.exit(1);
}
