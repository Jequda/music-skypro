import { trackType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistStateType = {
  currentTrack: null | trackType;
  playlist: trackType[];
  shuffledPlaylist: trackType[];
  isShuffle: boolean;
  isPlaying: boolean;
  filterOptions: {
    author: string[];
    genre: string[];
    order: string;
    searchValue: string;
  };
  filteredTracks: trackType[];
  initialTracks: trackType[];
};

const initialState: PlaylistStateType = {
  currentTrack: null,
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  isPlaying: false,
  filterOptions: {
    author: [],
    genre: [],
    order: "По умолчанию",
    searchValue: "",
  },
  filteredTracks: [],
  initialTracks: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setInitialTracks: (
      state,
      action: PayloadAction<{ initialTracks: trackType[] }>
    ) => {
      state.initialTracks = action.payload.initialTracks;
      state.filteredTracks = action.payload.initialTracks;
    },
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
    setFilters: (
      state,
      action: PayloadAction<{
        author?: string[];
        genre?: string[];
        order?: string;
        searchValue?: string;
      }>
    ) => {
      state.filterOptions = {
        author: action.payload.author || state.filterOptions.author,
        genre: action.payload.genre || state.filterOptions.genre,
        order: action.payload.order || state.filterOptions.order,
        searchValue:
          action.payload.searchValue || state.filterOptions.searchValue,
      };
      state.filteredTracks = state.initialTracks.filter((track) => {
        const hasAuthor = state.filterOptions.author.length != 0;

        const isAuthors = hasAuthor
          ? state.filterOptions.author.includes(track.author)
          : true;
        const hasGenres = state.filterOptions.genre.length != 0;
        const isGenres = hasGenres
          ? state.filterOptions.genre.includes(track.genre)
          : true;

        const hasSearchValue =
          track.name
            .toLowerCase()
            .includes(state.filterOptions.searchValue.toLowerCase()) ||
          track.author
            .toLowerCase()
            .includes(state.filterOptions.searchValue.toLowerCase());
        return isAuthors && isGenres && hasSearchValue;
      });
      if (state.filterOptions.order === "Сначала новые") {
        state.filteredTracks.sort(
          (a, b) =>
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
        );
      } else if (state.filterOptions.order === "Сначала старые") {
        state.filteredTracks.sort(
          (a, b) =>
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
        );
      } else state.filteredTracks;
    },
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
  setInitialTracks,
  setCurrentTrack,
  nextTrack,
  prevTrack,
  setIsShaffle,
  setIsPlaying,
  setFilters,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
