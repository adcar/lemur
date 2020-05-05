interface idsToChildren {
  [id: number]: number[];
}

interface IComment {
  content: string;
  id: number;
  parent_id: number | null;
  children?: Comment[] | null;
}
