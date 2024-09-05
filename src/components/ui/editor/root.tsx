'use client'

import { EditorContent, useEditor, EditorContext } from '@tiptap/react'

import { Header } from './header'
import { extensions } from './extensions'

interface EditorRootProps {
  value?: string
  onValueChange: (value: string) => void
}

export const Root = (props: EditorRootProps) => {
  const { value, onValueChange } = props

  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: ({ editor }) => {
      onValueChange(editor.getHTML())
    },
  })

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
