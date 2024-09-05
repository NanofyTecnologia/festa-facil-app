'use client'

import { Fragment, useState } from 'react'
import { useCurrentEditor } from '@tiptap/react'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Check,
  ChevronDown,
  Code,
  Image as ImageIcon,
  Italic,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { colors } from './colors'
import { Select } from '../select'
import { Button } from '../button'
import { Popover } from '../popover'
import { Input } from '../input'

type SetURLData = {
  url: string
}

type SetImageData = {
  link: string
}

export const Header = () => {
  const { editor } = useCurrentEditor()

  const [letterColor, setLetterColor] = useState('#000000')

  const { register: registerFormLink, handleSubmit: handleSubmitFormLink } =
    useForm<SetImageData>()
  const { reset, register, handleSubmit } = useForm<SetURLData>()

  const commands = {
    undo() {
      editor?.chain().focus().undo().run()
    },
    redo() {
      editor?.chain().focus().redo().run()
    },
    bold() {
      editor?.chain().focus().toggleBold().run()
    },
    italic() {
      editor?.chain().focus().toggleItalic().run()
    },
    underline() {
      editor?.chain().focus().toggleUnderline().run()
    },
    strike() {
      editor?.chain().focus().toggleStrike().run()
    },
    code() {
      editor?.chain().focus().toggleCode().run()
    },
    align(align: 'left' | 'right' | 'center' | 'justify') {
      editor?.chain().focus().setTextAlign(align).run()
    },
    bulletList() {
      editor?.chain().focus().toggleBulletList().run()
    },
    orderedList() {
      editor?.chain().focus().toggleOrderedList().run()
    },
    setLink(url: string) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    },
    unsetLink() {
      editor?.chain().focus().unsetLink().run()
    },
    setImage(link: string) {
      editor?.chain().focus().setImage({ src: link }).run()
    },
  }

  const defaultFormat = () => {
    if (editor?.isActive('paragraph')) return 'paragraph'
    if (editor?.isActive('heading', { level: 1 })) return 'h1'
    if (editor?.isActive('heading', { level: 2 })) return 'h2'
    if (editor?.isActive('heading', { level: 3 })) return 'h3'
    if (editor?.isActive('heading', { level: 4 })) return 'h4'
    if (editor?.isActive('heading', { level: 5 })) return 'h5'
    if (editor?.isActive('heading', { level: 6 })) return 'h6'
  }

  const changeFormat = (value: string) => {
    switch (value) {
      case 'paragraph':
        editor?.chain().focus().setParagraph().run()
        break
      case 'h1':
        editor?.chain().focus().toggleHeading({ level: 1 }).run()
        break
      case 'h2':
        editor?.chain().focus().toggleHeading({ level: 2 }).run()
        break
      case 'h3':
        editor?.chain().focus().toggleHeading({ level: 3 }).run()
        break
      case 'h4':
        editor?.chain().focus().toggleHeading({ level: 4 }).run()
        break
      case 'h5':
        editor?.chain().focus().toggleHeading({ level: 5 }).run()
        break
      case 'h6':
        editor?.chain().focus().toggleHeading({ level: 6 }).run()
        break
    }
  }

  const changeColor = (value?: string) => {
    const color = value ?? letterColor

    editor?.chain().focus().setColor(color).run()
    setLetterColor(color)
  }

  const onSubmitImage: SubmitHandler<SetImageData> = (data) => {
    commands.setImage(data.link)
  }

  const onSubmitURL: SubmitHandler<SetURLData> = (data) => {
    commands.setLink(data.url)
    reset()
  }

  return (
    <header className="flex items-center justify-start gap-4 border-b p-2">
      <div className="flex h-9 items-center gap-2 rounded-md border">
        <Button.Root size="icon" variant="ghost" onClick={commands.undo}>
          <Undo className="size-4" />
        </Button.Root>

        <Button.Root size="icon" variant="ghost" onClick={commands.redo}>
          <Redo className="size-4" />
        </Button.Root>
      </div>

      <Select.Root value={defaultFormat()} onValueChange={changeFormat}>
        <Select.Trigger className="max-w-60">
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="paragraph">Parágrafo</Select.Item>
          <Select.Item value="h1">Heading 1</Select.Item>
          <Select.Item value="h2">Heading 2</Select.Item>
          <Select.Item value="h3">Heading 3</Select.Item>
          <Select.Item value="h4">Heading 4</Select.Item>
          <Select.Item value="h5">Heading 5</Select.Item>
          <Select.Item value="h6">Heading 6</Select.Item>
        </Select.Content>
      </Select.Root>

      <div className="flex">
        <button
          type="button"
          onClick={() => changeColor()}
          className="me-0.5 size-6 rounded-sm"
          style={{ backgroundColor: letterColor }}
        />

        <Popover.Root>
          <Popover.Trigger className="rounded-sm align-middle hover:bg-blue-100">
            <ChevronDown className="size-4" />
          </Popover.Trigger>
          <Popover.Content className="max-w-48">
            <div className="grid grid-cols-5 justify-center gap-x-2 gap-y-3">
              {colors.map((color, index) => (
                <Fragment key={index + color}>
                  <button
                    type="button"
                    onClick={() => changeColor(color)}
                    className="size-6 rounded-sm transition-all hover:scale-110"
                    style={{ backgroundColor: color }}
                  />
                </Fragment>
              ))}
            </div>
          </Popover.Content>
        </Popover.Root>
      </div>

      <div className="flex h-9 items-center gap-2 rounded-md border">
        <Button.Root
          size="icon"
          variant="ghost"
          onClick={commands.bold}
          data-active={editor?.isActive('bold')}
        >
          <Bold className="size-4" />
        </Button.Root>

        <Button.Root
          size="icon"
          variant="ghost"
          onClick={commands.underline}
          data-active={editor?.isActive('underline')}
        >
          <Underline className="size-4" />
        </Button.Root>

        <Button.Root
          size="icon"
          variant="ghost"
          onClick={commands.italic}
          data-active={editor?.isActive('italic')}
        >
          <Italic className="size-4" />
        </Button.Root>

        <Button.Root
          size="icon"
          variant="ghost"
          onClick={commands.strike}
          data-active={editor?.isActive('strike')}
        >
          <Strikethrough className="size-4" />
        </Button.Root>

        <Button.Root
          size="icon"
          variant="ghost"
          onClick={commands.code}
          data-active={editor?.isActive('code')}
        >
          <Code className="size-4" />
        </Button.Root>
      </div>

      <div className="flex h-9 items-center gap-2 rounded-md border">
        <Button.Root
          size="icon"
          variant="ghost"
          onClick={() => commands.align('left')}
          data-active={editor?.isActive({ textAlign: 'left' })}
        >
          <AlignLeft className="size-4" />
        </Button.Root>

        <Button.Root
          size="icon"
          variant="ghost"
          onClick={() => commands.align('center')}
          data-active={editor?.isActive({ textAlign: 'center' })}
        >
          <AlignCenter className="size-4" />
        </Button.Root>

        <Button.Root
          size="icon"
          variant="ghost"
          onClick={() => commands.align('right')}
          data-active={editor?.isActive({ textAlign: 'right' })}
        >
          <AlignRight className="size-4" />
        </Button.Root>

        <Button.Root
          size="icon"
          variant="ghost"
          onClick={() => commands.align('justify')}
          data-active={editor?.isActive({ textAlign: 'justify' })}
        >
          <AlignJustify className="size-4" />
        </Button.Root>
      </div>

      <div className="flex h-9 items-center gap-2 rounded-md border">
        <Button.Root
          size="icon"
          variant="ghost"
          onClick={() => commands.bulletList()}
          data-active={editor?.isActive('bulletList')}
        >
          <List className="size-4" />
        </Button.Root>

        <Button.Root
          size="icon"
          variant="ghost"
          onClick={() => commands.orderedList()}
          data-active={editor?.isActive('orderedList')}
        >
          <ListOrdered className="size-4" />
        </Button.Root>
      </div>

      <div className="flex h-9 items-center gap-2 rounded-md border">
        {!editor?.isActive('link') && (
          <Popover.Root>
            <Popover.Trigger asChild>
              <Button.Root size="icon" variant="ghost">
                <Link2 className="size-4" />
              </Button.Root>
            </Popover.Trigger>
            <Popover.Content className="p-2">
              <form
                onSubmit={handleSubmit(onSubmitURL)}
                className="flex items-center gap-1 text-end"
              >
                <Input.Root {...register('url')} placeholder="URL" />

                <Button.Root type="submit" size="sm">
                  <Check className="size-4" />
                </Button.Root>
              </form>
            </Popover.Content>
          </Popover.Root>
        )}

        {editor?.isActive('link') && (
          <Button.Root size="icon" variant="ghost" onClick={commands.unsetLink}>
            <Link2Off className="size-4" />
          </Button.Root>
        )}

        <Popover.Root>
          <Popover.Trigger asChild>
            <Button.Root size="icon" variant="ghost">
              <ImageIcon className="size-4" />
            </Button.Root>
          </Popover.Trigger>
          <Popover.Content className="p-2">
            <form
              onSubmit={handleSubmitFormLink(onSubmitImage)}
              className="flex items-center gap-1 text-end"
            >
              <Input.Root {...registerFormLink('link')} placeholder="URL" />

              <Button.Root type="submit" size="sm">
                <Check className="size-4" />
              </Button.Root>
            </form>
          </Popover.Content>
        </Popover.Root>
      </div>
    </header>
  )
}
