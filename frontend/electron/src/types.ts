export type VideoModel = {
  readonly id: number;
  readonly videoURL: string;
  readonly title: string;
  readonly uploadDate: string;
  readonly thumbnailURL: string;
  readonly audioURL: string;
  readonly likes: number;
  readonly dislikes: number;
  readonly views: number;
};
