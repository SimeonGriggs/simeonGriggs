import {articleType} from './documents/articleType'
import {commentType} from './documents/commentType'
import {siteMetaType} from './documents/siteMetaType'
import {tailwindType} from './documents/tailwindType'
import {talkType} from './documents/talkType'
import {breakType} from './objects/breakType'
import {buttonType} from './objects/buttonType'
import {codeSandboxType} from './objects/codeSandboxType'
import {linkType} from './objects/linkType'
import {portableTextType} from './objects/portableTextType'
import {seoType} from './objects/seoType'
import {videoType} from './objects/videoType'

export const schemaTypes = [
  // documents
  articleType,
  siteMetaType,
  commentType,
  tailwindType,
  talkType,

  // objects
  seoType,
  portableTextType,
  buttonType,
  videoType,
  linkType,
  breakType,
  codeSandboxType,
]
