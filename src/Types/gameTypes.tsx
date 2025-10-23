interface IGame {
  id?: number;
  name?: string;
  description?: string;
  review: string;
  score: number;
  filePath?: string;
}

export { IGame };
