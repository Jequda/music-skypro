"use client";

import Playlist from "@/components/Playlist/Playlist";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { trackType } from "@/types";
import { setInitialTracks } from "@/store/features/PlaylistSlice";
import { getTracks } from "@/api/tracks";
import Filters from "@/components/Filters/Filters";
import styles from "./layout.module.css";

export default function MainTracksPage() {
  const dispatch = useAppDispatch();
  const [tracks, setTracks] = useState<trackType[]>([]);
  const filteredTracks = useAppSelector(
    (state) => state.playlist.filteredTracks
  );

  useEffect(() => {
    getTracks().then((tracksData) => {
      setTracks(tracksData);
      dispatch(setInitialTracks({ initialTracks: tracksData }));
    });
  }, [dispatch]);
  return (
    <>
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filters />
      <Playlist tracks={filteredTracks} playlist={tracks} />
    </>
  );
}
