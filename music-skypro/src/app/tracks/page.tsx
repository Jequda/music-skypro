"use client";

import Playlist from "@/components/Playlist/Playlist";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { trackType } from "@/types";
import { setInitialTracks } from "@/store/features/PlaylistSlice";
import { getTracks } from "@/api/tracks";

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
  return <Playlist tracks={filteredTracks} playlist={tracks} />;
}
