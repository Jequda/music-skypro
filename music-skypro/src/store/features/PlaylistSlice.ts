import { trackType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistStateType = {
  currentTrack: null | trackType;
  playlist: trackType[];
  shuffledPlaylist: trackType[];
  isShuffle: boolean;
  isPlaying: boolean;
};

const initialState: PlaylistStateType = {
  currentTrack: null,
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  isPlaying: false,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCurrentTrack: (
      state,
      action: PayloadAction<{ track: trackType; tracksData: trackType[] }>
    ) => {
      state.currentTrack = action.payload.track;
      state.playlist = action.payload.tracksData;
      state.isPlaying = true;
      state.shuffledPlaylist = [...action.payload.tracksData].sort(
        () => 0.5 - Math.random()
      );
    },
    setIsShaffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    nextTrack: changeTrack(1),
    prevTrack: changeTrack(-1),
  },
});
function changeTrack(direction: number) {
  return (state: PlaylistStateType) => {
    const currentTracks = state.isShuffle
      ? state.shuffledPlaylist
      : state.playlist;
    let newIndex =
      currentTracks.findIndex((item) => item.id === state.currentTrack?.id) +
      direction;

    // Циклическое переключение
    newIndex = (newIndex + currentTracks.length) % currentTracks.length;

    state.currentTrack = currentTracks[newIndex];
    state.isPlaying = true;
  };
}
export const {
  setCurrentTrack,
  nextTrack,
  prevTrack,
  setIsShaffle,
  setIsPlaying,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
