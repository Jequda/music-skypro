const apiUrl = "https://skypro-music-api.skyeng.tech/catalog/track/all/";
const appUrlCategory =
  "https://skypro-music-api.skyeng.tech/catalog/selection/";
const appUrlTrack = "https://skypro-music-api.skyeng.tech/catalog/track/";
const appUrlFavoriteTracks =
  "https://skypro-music-api.skyeng.tech/catalog/track/favorite/all/";

export async function getTracks() {
  const res = await fetch(apiUrl);

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }

  return res.json();
}

export async function getCategoryTracks(id: string) {
  const res = await fetch(appUrlCategory + id);

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }

  const data = await res.json();
  return data.items;
}

export async function postFavoriteTrack(id: string) {
  const res = await fetch(appUrlTrack + id + "/favorite", {
    method: "POST",
    // headers: {
    //   Authorization: `Bearer ${accessToken}`,
    // },
  });

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }

  return res.json();
}

export async function getFavoriteTrack() {
  const res = await fetch(appUrlFavoriteTracks);

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }

  const data = await res.json();
  return data.items;
}
