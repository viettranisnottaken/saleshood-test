import { TNote } from "../../model/note.model";
import { v4 as uuidv4 } from 'uuid';

export const NOTES_MOCK: TNote[] = [
  {
    id: uuidv4(),
    content: 'note 1',
    updatedAt: new Date('2020-10-10').getTime(),
  },
  {
    id: uuidv4(),
    content: 'note 2',
    updatedAt: new Date('2020-10-11').getTime(),
  },
  {
    id: uuidv4(),
    content: 'note 3',
    updatedAt: new Date('2020-10-12').getTime(),
  },
  {
    id: uuidv4(),
    content: 'note 4',
    updatedAt: new Date('2020-10-13').getTime(),
  },
];
