import {articleType} from './documents/articleType'
import {siteMetaType} from './documents/siteMetaType'
import {codeSandboxType} from './objects/codeSandboxType'
import {tailwindType} from './documents/tailwindType'
import {commentType} from './documents/commentType'
import {breakType} from './objects/breakType'
import {linkType} from './objects/linkType'
import {talkType} from './documents/talkType'
import {portableTextType} from './objects/portableTextType'
import {buttonType} from './objects/buttonType'
import {seoType} from './objects/seoType'
import {videoType} from './objects/videoType'
import {playbookType} from './documents/playbookType'

export const schemaTypes = [
  // documents
  articleType,
  siteMetaType,
  commentType,
  tailwindType,
  talkType,
  playbookType,
  // objects
  seoType,
  portableTextType,
  buttonType,
  videoType,
  linkType,
  breakType,
  codeSandboxType,
]
