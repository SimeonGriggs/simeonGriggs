import {useMemo} from 'react'
import {Card, useTheme} from '@sanity/ui'
import {hues, ColorHueKey} from '@sanity/color'
import {
  DocumentTextIcon,
  BanIcon,
  ChatIcon,
  SpeakerphoneIcon,
  CogIcon,
  ColorSwatchIcon,
} from '@heroicons/react/outline'

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
    icon: <BanIcon />,
    color: `red`,
  },
  {
    name: `comment`,
    icon: <ChatIcon />,
    color: `green`,
  },
  {
    name: `talk`,
    icon: <SpeakerphoneIcon />,
    color: `orange`,
  },
  {
    name: `siteMeta`,
    icon: <CogIcon />,
    color: `purple`,
  },
  {
    name: `tailwind`,
    icon: <ColorSwatchIcon />,
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
    }),
    [iconData, isDarkMode]
  )

  return (
    <Card style={cardStyle} padding={2} radius={2}>
      {iconData.icon}
    </Card>
  )
}
