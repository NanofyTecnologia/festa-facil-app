import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import Code from '@tiptap/extension-code'
import TextAlign from '@tiptap/extension-text-align'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import HardBreak from '@tiptap/extension-hard-break'

export const extensions = [
  Color,
  Image,
  Strike,
  ListItem,
  TextStyle,
  HardBreak,
  Underline,
  BulletList,
  OrderedList,
  Link.configure({
    HTMLAttributes: {
      class: 'underline cursor-pointer',
    },
    openOnClick: false,
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  StarterKit.configure({
    paragraph: {
      HTMLAttributes: {
        class: 'text-base',
      },
    },
  }),
  Code.configure({
    HTMLAttributes: {
      class: 'bg-blue-100 px-0.5 rounded',
    },
  }),
]
