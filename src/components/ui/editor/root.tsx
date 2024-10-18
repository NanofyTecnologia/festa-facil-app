'use client'

import { EditorContent, useEditor, EditorContext } from '@tiptap/react'

import { Header } from './header'
import { extensions } from './extensions'
import { useEffect, useState } from 'react'

interface EditorRootProps {
  value?: string
  onValueChange: (value: string) => void
}

export const Root = (props: EditorRootProps) => {
  const { value, onValueChange } = props
  const [mounted, setMounted] = useState(false)

  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: ({ editor }) => {
      onValueChange(editor.getHTML())
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    if (editor && value !== undefined && !mounted) {
      setMounted(true)
      editor.commands.setContent(value)
    }
  }, [value, editor, mounted])

  return (
    <div className="rounded-md border">
      <EditorContext.Provider value={{ editor }}>
        <Header />

        <EditorContent
          className="min-h-60 p-2 text-start text-base"
          editor={editor}
        />
      </EditorContext.Provider>
    </div>
  )
}
