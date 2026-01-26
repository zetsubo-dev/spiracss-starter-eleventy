// SpiraCSS Configuration for Eleventy Starter
export default {
  aliasRoots: {
    styles: ['src/styles'],
    assets: ['src/assets'],
    layouts: ['src/_includes/layouts'],
    partials: ['src/_includes/partials'],
    blocks: ['src/_includes/blocks']
  },
  stylelint: {
    base: {
      external: {
        prefixes: ['u-']
      },
      paths: {
        components: ['src/_includes']
      }
    }
  },
  generator: {
    globalScssModule: 'styles/partials/global',
    layoutMixins: ['@include breakpoint-up(md)']
  }
}
