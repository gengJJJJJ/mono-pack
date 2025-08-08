import {globalIgnores} from 'eslint/config'
import {
	defineConfigWithVueTs,
	vueTsConfigs
} from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'

import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
	globalIgnores([
		'**/dist/**',
		'**/dist-ssr/**',
		'**/coverage/**',
		'**/manifest.json',
		'**/pages.json',
		'**/launch.json',
		'**/.editorconfig',
		'**/.gitattributes',
		'**/.gitignore',
		'**/.prettierrc.json',
		'**/.stylelintignore',
		'**/.vscode/**',
		'**/README.md',
		'**/index.html',
		'**/package.json',
		'**/pnpm-lock.yaml',
		'**/public/**',
		'**/tsconfig*.json'
	]),

	pluginVue.configs['flat/essential'],
	vueTsConfigs.recommended,

	{
		...pluginVitest.configs.recommended,
		files: ['src/**/__tests__/*']
	},
	skipFormatting,
	{
		name: 'app/files-to-lint',
		files: ['**/*.{ts,mts,tsx,vue}'],
		rules: {
			'no-console': 'off', // 允许console
			'no-unused-vars': 'warn', // 警告未使⽤的变量
			'ts/ban-ts-comment': 'off', // 允许忽略类型检查
			'ts/prefer-ts-expect-error': 'off', // 允许@ts-ignore
			'vue/multi-word-component-names': 'off',
			'@typescript-eslint/no-explicit-any': 'off' // 允许any
			// 'eslint-comments/no-unlimited-disable': 'off', // 允许忽略规则
			// 'unused-imports/no-unused-imports': 'error', // 不允许未使用的导入
			// 'import/consistent-type-specifier-style': [
			// 	'error',
			// 	'prefer-top-level'
			// ], // 类型导入放在顶层
			// 'import/order': [
			// 	// 导入排序
			// 	'error',
			// 	{
			// 		groups: ['type', 'builtin', 'external', 'internal'],
			// 		'newlines-between': 'always'
			// 	}
			// ]
		}
	},
	{
		files: ['**/*.md/*'],
		rules: {
			'unused-imports/no-unused-imports': 'off' // 允许未使用的导入
		}
	}
)
