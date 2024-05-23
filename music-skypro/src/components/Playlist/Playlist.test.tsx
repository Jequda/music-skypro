import React from "react";
import { render } from "@testing-library/react";
import Track from "./Playlist"; // Замените на имя вашего компонента
import { trackType } from "@/types";

describe("YourComponent", () => {
  // Замените на имя вашего компонента
  it("should render tracks correctly", () => {
    const tracks: trackType[] = [
      {
        id: 1,
        name: "Chase",
        author: "Alexander Nakarada",
        release_date: "2005-06-11",
        genre: "Классическая музыка",
        duration_in_seconds: 205,
        album: "Chase",
        logo: null,
        track_file:
          "https://skypro-music-api.skyeng.tech/media/music_files/Alexander_Nakarada_-_Chase.mp3",
        stared_user: [
          {
            id: 14,
            username: "user",
            first_name: "",
            last_name: "",
            email: "user@mail.ru",
          },
        ],
      },
      {
        id: 2,
        name: "Open Sea epic",
        author: "Frank Schroter",
        release_date: "2019-06-12",
        genre: "Классическая музыка",
        duration_in_seconds: 165,
        album: "Open Sea epic",
        logo: null,
        track_file:
          "https://skypro-music-api.skyeng.tech/media/music_files/Frank_Schroter_-_Open_Sea_epic.mp3",
        stared_user: [
          {
            id: 14,
            username: "user",
            first_name: "",
            last_name: "",
            email: "user@mail.ru",
          },
        ],
      },
    ];

    const playlist: trackType[] = [
      {
        id: 1,
        name: "Chase",
        author: "Alexander Nakarada",
        release_date: "2005-06-11",
        genre: "Классическая музыка",
        duration_in_seconds: 205,
        album: "Chase",
        logo: null,
        track_file:
          "https://skypro-music-api.skyeng.tech/media/music_files/Alexander_Nakarada_-_Chase.mp3",
        stared_user: [
          {
            id: 14,
            username: "user",
            first_name: "",
            last_name: "",
            email: "user@mail.ru",
          },
        ],
      },
      {
        id: 2,
        name: "Open Sea epic",
        author: "Frank Schroter",
        release_date: "2019-06-12",
        genre: "Классическая музыка",
        duration_in_seconds: 165,
        album: "Open Sea epic",
        logo: null,
        track_file:
          "https://skypro-music-api.skyeng.tech/media/music_files/Frank_Schroter_-_Open_Sea_epic.mp3",
        stared_user: [
          {
            id: 14,
            username: "user",
            first_name: "",
            last_name: "",
            email: "user@mail.ru",
          },
        ],
      },
    ];

    const { getAllByTestId } = render(
      <Track tracks={tracks} playlist={playlist} />
    );

    // Проверяем, что каждый трек отображается
    const renderedTracks = getAllByTestId("track"); // Предполагается, что у вас есть data-testid="track" в компоненте Track
    expect(renderedTracks).toHaveLength(tracks.length);
  });
});
