"use client";
import { getFavoriteTracks, refreshToken } from "@/api/tracks";
import styles from "../layout.module.css";
import Playlist from "@/components/Playlist/Playlist";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { trackType } from "@/types";
import { useRouter } from "next/navigation";

export default function FavoritePage() {
  const { token, user } = useUser();
  const [tracksData, setTracksData] = useState<trackType[]>([]);
  const router = useRouter();

  useEffect(() => {
    getFavoriteTracks(token?.access!)
      .then((data) => {
        setTracksData(data);
      })
      .catch((error) => {
        if (error.message === "401" && !user) {
          refreshToken(token?.refresh!).then((data) => {
            getFavoriteTracks(data.access).then((newData) => {
              setTracksData(newData);
            });
          });
        } else {
          alert("Пожалуйста авторизуйтесь");
          router.push("/");
        }
      });
  }, [token]);

  return (
    <>
      <h2 className={styles.centerblockH2}>Мои треки</h2>
      <Playlist tracks={tracksData} playlist={tracksData} isFavorite={true} />
    </>
  );
}
