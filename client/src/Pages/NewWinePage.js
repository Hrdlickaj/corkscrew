import React, { useState } from 'react';
import NewWineForm from '../Components/NewWineForm';

function NewWinePage({ handleAddWine, user }) {
  const [tastingNoteEditorContent, setTastingNoteEditorContent] = useState('');
  const [memoryEditorContent, setMemoryEditorContent] = useState('');

  return (
    <>
      <NewWineForm
        user={user}
        onAddWine={handleAddWine}
        tastingNote={tastingNoteEditorContent}
        handleTastingNoteState={setTastingNoteEditorContent}
        memoryNote={memoryEditorContent}
        handleMemoryNoteState={setMemoryEditorContent}
      />
    </>
  );
}

export default NewWinePage;
