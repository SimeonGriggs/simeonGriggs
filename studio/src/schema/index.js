import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import article from './documents/article'

import seo from './objects/seo'
import portableText from './objects/portableText'
import button from './objects/button'
import video from './objects/video'
import link from './objects/link'
import siteMeta from './documents/siteMeta'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([article, siteMeta, seo, portableText, button, video, link]),
})
