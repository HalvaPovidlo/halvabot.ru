import {SongModel} from "./song.model";

export interface PlayerStatusModel {
  is_error: boolean,
  error_message: string,
  current: SongModel | null,
  position: number,
  length: number,
  loop: boolean,
  radio: boolean,
  queue: SongModel[],
}
