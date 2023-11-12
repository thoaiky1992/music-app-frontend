import { GenreEntity } from "./genre.entity";

export interface MusicEntity {
  _id: string;
  title: string;
  artists: string;
  slug: string;
  image: string;
  src: string;
  views: number;
  likes: number;
  genre: GenreEntity | string;
}
