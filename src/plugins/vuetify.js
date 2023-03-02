/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { mdiHeartOutline } from '@mdi/js'
import { mdiArrowLeft } from '@mdi/js'
import { mdiCheck } from '@mdi/js'
import { mdiBookmarkOutline } from '@mdi/js'
import { mdiSendCircle } from '@mdi/js'
import { mdiHeart } from '@mdi/js'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      outlinedHeart: mdiHeartOutline,
      arrowLeft:mdiArrowLeft,
      check:mdiCheck,
      bookMark:mdiBookmarkOutline,
      send:mdiSendCircle,
      strokeHeart: mdiHeart
    },
    sets: {
      mdi,
    },
  },
})
