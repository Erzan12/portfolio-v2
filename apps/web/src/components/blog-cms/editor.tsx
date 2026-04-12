import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function Editor({ onChange }: { onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start writing your dev log...</p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Send HTML back to the parent form
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px] border rounded-md p-4',
      },
    },
  })

  return <EditorContent editor={editor} />
}