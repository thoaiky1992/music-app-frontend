import { UserEntity } from "./user.enity";
import { MusicEntity } from "@/entities/music.entity";

export interface MyLibraryEntity {
  _id: string;
  user: UserEntity | string;
  songs: Array<MusicEntity> | string;
}
