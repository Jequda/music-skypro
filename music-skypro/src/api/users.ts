import { userType } from "@/types";

const signupUrl = "https://skypro-music-api.skyeng.tech/user/signup/";
const loginUrl = "https://skypro-music-api.skyeng.tech/user/login/";
const tokenUrl = "https://skypro-music-api.skyeng.tech/user/token/";
const refreshTokenUrl =
  "https://skypro-music-api.skyeng.tech/user/token/refresh/";

export async function signupUser({ email, password, username }: userType) {
  const response = await fetch(signupUrl, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      username: username,
    }),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      "content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Такой пользователь уже существует");
  }

  return response.json();
}

export async function loginUser({ email, password }: userType) {
  const response = await fetch(loginUrl, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      "content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Такой пользователь уже существует");
  }

  return response.json();
}
