import { getCategoryTracks } from "@/api/tracks";
import Playlist from "@/components/Playlist/Playlist";
import { CategoryType, trackType } from "@/types";

export default async function CategoryPage({ params }: CategoryType) {
  const tracksData = await getCategoryTracks(params.id);
  return <Playlist tracks={tracksData} playlist={tracksData} />;
}
