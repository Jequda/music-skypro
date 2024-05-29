"use client";
import { getFavoriteTracks } from "@/api/tracks";
import styles from "../layout.module.css";
import Playlist from "@/components/Playlist/Playlist";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { trackType } from "@/types";

export default function FavoritePage() {
  const { user }: any = useUser(); // не знаю какой тип тут написать
  const [tracksData, setTracksData] = useState<trackType[]>([]);
  useEffect(() => {
    const token = user.token;
    getFavoriteTracks(token?.access).then((data) => {
      setTracksData(data);
    });
  });

  return (
    <>
      <h2 className={styles.centerblockH2}>Мои треки</h2>
      <Playlist tracks={tracksData} playlist={tracksData} />
    </>
  );
}
