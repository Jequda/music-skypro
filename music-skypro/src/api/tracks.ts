const apiUrl = "https://skypro-music-api.skyeng.tech/catalog/track/all/";
const appUrlCategory =
  "https://skypro-music-api.skyeng.tech/catalog/selection/";
const appUrlTrack = "https://skypro-music-api.skyeng.tech/catalog/track/";
const appUrlFavoriteTracks =
  "https://skypro-music-api.skyeng.tech/catalog/track/favorite/all/";
const appUrlToken = "https://skypro-music-api.skyeng.tech/user/token/";
const appUrlRefreshToken =
  "https://skypro-music-api.skyeng.tech/user/token/refresh/";

export async function getTracks() {
  const res = await fetch(apiUrl);

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }

  return res.json();
}

export async function getCategoryTracks(id: string) {
  const res = await fetch(appUrlCategory + id, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }

  const data = await res.json();
  return data.items;
}

export async function postFavoriteTracks(id: number, token: string) {
  const res = await fetch(appUrlTrack + id + "/favorite/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(JSON.stringify(res.status));
  }

  return res.json();
}

export async function deleteFavoriteTracks(id: number, token: string) {
  const res = await fetch(appUrlTrack + id + "/favorite/", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(JSON.stringify(res.status));
  }

  return res.json();
}

export async function getFavoriteTracks(token: string) {
  const res = await fetch(appUrlFavoriteTracks, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(JSON.stringify(res.status));
  }

  const data = await res.json();
  return data;
}

export async function getToken({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await fetch(appUrlToken, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      "content-type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }

  return res.json();
}

export async function refreshToken(token: string) {
  const res = await fetch(appUrlRefreshToken, {
    method: "POST",
    body: JSON.stringify({
      refresh: token,
    }),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      "content-type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }

  return res.json();
}
