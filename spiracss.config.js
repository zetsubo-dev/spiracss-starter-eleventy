// Shared native CSS scope configuration; framework markup adapters are separate.
export default {
  "aliasRoots": {
    "src": [
      "src"
    ],
    "components": [
      "src/components"
    ],
    "styles": [
      "src/styles"
    ],
    "layouts": [
      "src/_includes/layouts"
    ],
    "common": [
      "src/components/common"
    ],
    "pages": [
      "src/components/pages"
    ],
    "parts": [
      "src/components/parts"
    ],
    "assets": [
      "src/assets"
    ],
    "partials": [
      "src/_includes/partials"
    ],
    "blocks": [
      "src/_includes/blocks"
    ]
  },
  "fileCase": {
    "root": "pascal",
    "child": "kebab"
  },
  "stylelint": {
    "base": {
      "external": {
        "prefixes": [
          "u-"
        ]
      }
    }
  },
  "generator": {
    "scssRootStyle": "scope-explicit",
    "globalScssModule": "styles/partials/global",
    "pageEntryAlias": "assets",
    "pageEntrySubdir": "css",
    "layoutMixins": [
      "@include breakpoint-up(md)"
    ]
  }
}
