/** @type {import('stylelint').Config} */
import spiracssPlugin, { createRules } from '@spiracss/stylelint-plugin'
import spiracssConfig from './spiracss.config.js'

export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  plugins: [spiracssPlugin, 'stylelint-scss'],
  customSyntax: 'postcss-scss',
  ignoreFiles: ['node_modules/**', 'dist/**', '.next/**', '.nuxt/**', '.output/**', 'src/styles/partials/**', '!src/styles/partials/keyframes.scss'],
  rules: {
    ...createRules(spiracssConfig),
    'at-rule-no-unknown': null,
    'function-no-unknown': null,
    'no-descending-specificity': null,
    'selector-class-pattern': null,
    'declaration-property-value-no-unknown': null
  },
  overrides: [{ files: ['src/components/**/*.scss'], rules: { 'selector-max-type': 0 } }]
}
