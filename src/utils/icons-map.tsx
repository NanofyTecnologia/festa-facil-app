import { ReactNode } from 'react'

import Decoration from '@/components/icons/decoration'
import Grill from '@/components/icons/grill'

export const iconsMap: { [key: string]: ReactNode } = {
  buffet: <Grill className="size-16 text-zinc-400" />,
  decoration: <Decoration className="size-16 text-zinc-400" />,
}
