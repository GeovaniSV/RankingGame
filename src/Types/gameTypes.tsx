interface IGame {
  id?: number;
  name?: string;
  description?: string;
  review: string;
  score: number;
  filePath?: string;
}

interface IGameCardPreview {
  review: string;
  score: number;
  onPress: () => void;
}

export { IGame, IGameCardPreview };
