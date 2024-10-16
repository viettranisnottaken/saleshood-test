import { useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Note from '../../components/note/Note';
import Select, { TSelectOption } from '../../components/select/Select';
import { useNoteList } from '../../hooks/useNoteList';
import MainLayout from '../../layouts/main/main.layout';
import { TNote } from '../../model/note.model';
import './notes.scss';

export enum ESortBy {
  NewestToOldest = 'newestToOldest',
  oldestToNewest = 'oldestToNewest',
  AToZ = 'aToZ',
  ZToA = 'zToA',
}

export default function Notes() {
  const [notes, setNotes] = useNoteList();
  const [noteFormControl, setNoteFormControl] = useState<string>('');
  const [filterControl, setFilterControl] = useState<ESortBy | ''>('');
  const notesContainerRef = useRef<HTMLDivElement>(null);
  const sortedNotes = useMemo(() => {
    if (filterControl === '') {
      return [...notes];
    }

    let newNotes: TNote[] = [];

    switch (filterControl) {
      case ESortBy.NewestToOldest:
        newNotes = notes.toSorted((a, b) => b.updatedAt - a.updatedAt);
        break;

      case ESortBy.oldestToNewest:
        newNotes = notes.toSorted((a, b) => a.updatedAt - b.updatedAt);
        break;

      case ESortBy.AToZ:
        newNotes = notes.toSorted((a, b) => a.content.localeCompare(b.content));
        break;

      case ESortBy.ZToA:
        newNotes = notes.toSorted((a, b) => b.content.localeCompare(a.content));
        break;

      default:
        newNotes = notes.toSorted((a, b) => a.updatedAt - b.updatedAt);
        break;
    }

    return newNotes;
  }, [notes, filterControl]);

  const filterOptions: TSelectOption<ESortBy | ''>[] = [
    {
      label: 'Default',
      value: '',
    },
    {
      label: 'Newest -> Oldest',
      value: ESortBy.NewestToOldest,
    },
    {
      label: 'Oldest -> Newest',
      value: ESortBy.oldestToNewest,
    },
    {
      label: 'A -> Z',
      value: ESortBy.AToZ,
    },
    {
      label: 'Z -> A',
      value: ESortBy.ZToA,
    },
  ];

  useEffect(() => {
    notesContainerRef.current?.lastElementChild?.scrollIntoView();
  }, [notes]);

  const onNoteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteFormControl(e.target.value);
  };

  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addNote();
    }
  };

  const onNoteDelete = (noteId: string) => {
    setNotes((notes) => notes.filter(({ id }) => id !== noteId));
  };

  const resetForm = () => {
    setNoteFormControl(() => '');
  };

  const onSortSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOption = e.target.value as ESortBy;
    setFilterControl(newSortOption as ESortBy);
  };

  const handleSubmit = () => {
    addNote();
  };

  const addNote = () => {
    if (!noteFormControl) {
      return;
    }

    setNotes((notes) => [
      ...notes,
      { id: uuidv4(), content: noteFormControl, updatedAt: new Date().getTime() },
    ]);

    resetForm();
  };

  return (
    <MainLayout>
      <div>
        <h1>Notes</h1>

        <Select className="mb-4" options={filterOptions} onSelect={onSortSelected} />

        <div ref={notesContainerRef} className="notes-container mb-4">
          {sortedNotes.map((note) => (
            <Note
              key={note.id}
              content={note.content}
              onDelete={() => onNoteDelete(note.id)}
            ></Note>
          ))}
        </div>

        <div className="d-flex flex-column">
          <div className="note-input-container">
            <Input
              className="flex-grow-1 mr-2"
              type="text"
              placeholder="Write your note here"
              value={noteFormControl}
              onChange={onNoteInputChange}
              onKeyDown={handleEnterKeyDown}
            />

            <Button onClick={handleSubmit}>Submit</Button>
          </div>
          <small>Or press Enter to add note</small>
        </div>
      </div>
    </MainLayout>
  );
}
