import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import article from './documents/article'
import siteMeta from './documents/siteMeta'
import comment from './documents/comment'

import seo from './objects/seo'
import portableText from './objects/portableText'
import button from './objects/button'
import video from './objects/video'
import link from './objects/link'
import _break from './objects/break'
import codeSandbox from './objects/codeSandbox'
import tailwind from './documents/tailwind'
import talk from './documents/talk'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // documents
    article,
    siteMeta,
    comment,
    tailwind,
    talk,

    // objects
    seo,
    portableText,
    button,
    video,
    link,
    _break,
    codeSandbox,
  ]),
})
