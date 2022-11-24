import article from './documents/article'
import comment from './documents/comment'
import siteMeta from './documents/siteMeta'
import tailwind from './documents/tailwind'
import talk from './documents/talk'
import _break from './objects/break'
import button from './objects/button'
import codeSandbox from './objects/codeSandbox'
import link from './objects/link'
import portableText from './objects/portableText'
import seo from './objects/seo'
import video from './objects/video'

export const schemaTypes = [
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
]
