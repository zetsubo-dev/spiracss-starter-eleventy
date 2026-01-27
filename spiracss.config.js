// SpiraCSS Configuration for Eleventy Starter
export default {
  aliasRoots: {
    styles: ['src/styles'],
    assets: ['src/assets'],
    layouts: ['src/_includes/layouts'],
    partials: ['src/_includes/partials'],
    blocks: ['src/_includes/blocks'],
    components: ['src/_includes/blocks']
  },
  stylelint: {
    base: {
      external: {
        prefixes: ['u-']
      }
    }
  },
  generator: {
    globalScssModule: 'styles/partials/global',
    layoutMixins: ['@include breakpoint-up(md)']
  }
}
