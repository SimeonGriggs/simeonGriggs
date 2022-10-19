import {useMemo} from 'react'
import {Card, useTheme} from '@sanity/ui'
import type {ColorHueKey} from '@sanity/color'
import {hues} from '@sanity/color'
import {
  DocumentTextIcon,
  NoSymbolIcon,
  ChatBubbleBottomCenterIcon,
  PhoneIcon,
  CogIcon,
  SwatchIcon,
} from '@heroicons/react/24/outline'

type IconName = 'article' | 'unlisted' | 'comment' | 'talk' | 'siteMeta' | 'tailwind'

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
    name: `siteMeta`,
    icon: <CogIcon />,
    color: `purple`,
  },
  {
    name: `tailwind`,
    icon: <SwatchIcon />,
    color: `cyan`,
  },
]

export default function HeroIcon({icon = ``}) {
  const isDarkMode = useTheme()?.sanity?.color?.dark

  const iconData = icons.find(({name}) => name === icon) ?? icons[0]

  const cardStyle = useMemo(
    () => ({
      backgroundColor: hues[iconData.color][isDarkMode ? 950 : 50].hex,
      color: hues[iconData.color][isDarkMode ? 400 : 600].hex,
      borderColor: hues[iconData.color][isDarkMode ? 900 : 100].hex,
      borderWidth: 1,
      borderStyle: `solid`,
      width: `100%`,
      aspectRatio: `1`,
    }),
    [iconData, isDarkMode]
  )

  console.log(iconData)

  return (
    <Card style={cardStyle} radius={2} padding={1}>
      {iconData.icon}
    </Card>
  )
}
