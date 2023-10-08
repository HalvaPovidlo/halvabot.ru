export interface SongModel {
  id: string,
  title?: string,
  last_play?: string,
  playbacks?: number,
  url?: string,
  service?: string,
  artist_name?: string,
  artist_url?: string,
  artwork_url?: string | null,
  thumbnail_url?: string,
}
