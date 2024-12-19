import * as SecureStore from "expo-secure-store";

let token = null;

export async function setToken(newToken) {
  token = newToken;
  if (token !== null) {
    await SecureStore.setItemAsync("token", token);
  } else {
    await SecureStore.deleteItemAsync("token");
  }
}

export async function getToken() {
  if (token !== null) {
    return token;
  }

  token = await SecureStore.getItemAsync("token");
  return token;
}
