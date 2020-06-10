// Module imports
import behead from 'remark-behead'
import shortcodes from 'remark-shortcodes'





// Local imports
import { Code } from 'components/Code'
import { Shortcode } from 'components/Shortcode'





const config = {
  plugins: [
		[behead, { depth: 1 }],
    shortcodes,
  ],
  renderers: {
    code: Code,
    shortcode: Shortcode,
  },
}





export default config
