import { Dispatch, SetStateAction } from "react";

export type userType = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type trackType = {
  id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string;
  duration_in_seconds: number;
  album: string;
  logo: string | null;
  track_file: string;
  stared_user: userType[];
  isFavorite: boolean;
  isLiked: boolean;
};

export type CategoryType = {
  params: { id: string };
};

export type UserContextType = {
  user: userType | null;

  token?: TokenType;
  login: (
    newUser: number,
    loginData: { email: string; password: string }
  ) => void;
  logout: () => void;
};

export type TokenType = {
  access: string;
  refresh: string;
};
