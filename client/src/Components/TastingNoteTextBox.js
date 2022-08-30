import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

function TastingNoteTextBox({ handleTastingNoteState }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content:
      'Add your tasting notes. Describe what you liked, what you did not, and any additional details you would like to remember.',
    onUpdate({ editor }) {
      handleTastingNoteState(editor.getHTML());
    },
  });

  return <EditorContent editor={editor} />;
}

export default TastingNoteTextBox;
