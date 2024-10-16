import { useEffect, useState } from 'react';
import { NOTES_MOCK } from '../assets/data/notes';
import { TNote } from '../model/note.model';

export function useNoteList(): [TNote[], React.Dispatch<React.SetStateAction<TNote[]>>] {
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const [notes, setNotes] = useState<TNote[]>([]);

  useEffect(() => {
    if (isDataFetched) {
      return;
    }

    setIsDataFetched(true);
    setTimeout(() => {
      setNotes(NOTES_MOCK);
    }, 200);
  }, [isDataFetched]);

  return [notes, setNotes];
}
