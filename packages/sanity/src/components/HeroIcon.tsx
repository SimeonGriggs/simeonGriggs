import {
  BookOpenIcon,
  ChatBubbleBottomCenterIcon,
  CogIcon,
  DocumentTextIcon,
  NoSymbolIcon,
  PhoneIcon,
  PlayCircleIcon,
  SwatchIcon,
} from '@heroicons/react/24/outline'
import type {ColorHueKey} from '@sanity/color'
import {hues} from '@sanity/color'
import {Card, Flex, useTheme} from '@sanity/ui'
import type {CSSProperties} from 'react'
import {useMemo} from 'react'

type IconName =
  | 'article'
  | 'unlisted'
  | 'comment'
  | 'talk'
  | 'siteMeta'
  | 'tailwind'
  | 'youtube'
  | 'playbook'

type IconData = {
  name: IconName
  icon: React.ReactNode
  color: ColorHueKey
}

const icons: IconData[] = [
  {
    name: `article`,
    icon: <DocumentTextIcon />,
    color: `blue`,
  },
  {
    name: `unlisted`,
    icon: <NoSymbolIcon />,
    color: `red`,
  },
  {
    name: `comment`,
    icon: <ChatBubbleBottomCenterIcon />,
    color: `green`,
  },
  {
    name: `talk`,
    icon: <PhoneIcon />,
    color: `orange`,
  },
  {
    name: `playbook`,
    icon: <BookOpenIcon />,
    color: `cyan`,
  },
  {
    name: `siteMeta`,
    icon: <CogIcon />,
    color: `purple`,
  },
  {
    name: `tailwind`,
    icon: <SwatchIcon />,
    color: `cyan`,
  },
  {
    name: `youtube`,
    icon: <PlayCircleIcon />,
    color: `magenta`,
  },
]

export default function HeroIcon({icon = ``}) {
  const isDarkMode = useTheme()?.sanity?.color?.dark

  const iconData = icons.find(({name}) => name === icon) ?? icons[0]

  const cardStyle: CSSProperties = useMemo(
    () => ({
      backgroundColor: hues[iconData.color][isDarkMode ? 950 : 50].hex,
      color: hues[iconData.color][isDarkMode ? 400 : 600].hex,
      borderColor: hues[iconData.color][isDarkMode ? 900 : 100].hex,
      borderWidth: 1,
      borderStyle: `solid`,
      width: `100%`,
      aspectRatio: `1`,
    }),
    [iconData, isDarkMode],
  )

  return (
    <Card style={cardStyle} radius={2}>
      <Flex height="fill" align="center" justify="center" padding={0}>
        <span style={{transform: `translateY(-1px)`}}>{iconData.icon}</span>
      </Flex>
    </Card>
  )
}
