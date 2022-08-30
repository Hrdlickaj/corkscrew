import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

function MemoryTextBox({ handleMemoryNoteState }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: 'Tell the story of when you had this wine!',
    onUpdate({ editor }) {
      handleMemoryNoteState(editor.getHTML());
    },
  });

  return <EditorContent editor={editor} />;
}

export default MemoryTextBox;
