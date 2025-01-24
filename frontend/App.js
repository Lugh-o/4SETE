import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";

import LogInScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SplashScreen from "./screens/SplashScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";

import FilmesScreen from "./screens/filmes/FilmesScreen";
import FilmesCreateForm from "./screens/filmes/FilmesCreateForm";
import FilmesEditForm from "./screens/filmes/FilmesEditForm";

import ProcessosScreen from "./screens/processos/ProcessosScreen";
import ProcessosCreateForm from "./screens/processos/ProcessosCreateForm";
import ProcessosEditForm from "./screens/processos/ProcessosEditForm";

import RevelacoesScreen from "./screens/revelacao/RevelacoesScreen";
import RevelacoesCreateForm from "./screens/revelacao/RevelacoesCreateForm";
import RevelacoesEditForm from "./screens/revelacao/RevelacoesEditForm";
import RevelacoesConcluir from "./screens/revelacao/ConcluirRevelacao";

import CronometroScreen from "./screens/CronometroScreen";
import AuthContext from "./context/AuthContext";
import { loadUser } from "./services/AuthService";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function runEffect() {
      try {
        const user = await loadUser();
        setUser(user);
      } catch (e) {
        console.log("Failed to load user", e);
      }
      setStatus("idle");
    }
    runEffect();
  }, []);

  if (status === "loading") {
    return (
      <>
        <StatusBar translucent={true} backgroundColor={"#0000"} />
        <SplashScreen />
      </>
    );
  }

  return (
    <>
      <StatusBar translucent={true} backgroundColor={"#0000"} />
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {user ? (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="FilmesList" component={FilmesScreen} />
                <Stack.Screen
                  name="FilmesCreateForm"
                  component={FilmesCreateForm}
                />
                <Stack.Screen
                  name="FilmesEditForm"
                  component={FilmesEditForm}
                />

                <Stack.Screen
                  name="ProcessosList"
                  component={ProcessosScreen}
                />
                <Stack.Screen
                  name="ProcessosCreateForm"
                  component={ProcessosCreateForm}
                />
                <Stack.Screen
                  name="ProcessosEditForm"
                  component={ProcessosEditForm}
                />

                <Stack.Screen
                  name="RevelacoesList"
                  component={RevelacoesScreen}
                />
                <Stack.Screen
                  name="RevelacoesCreateForm"
                  component={RevelacoesCreateForm}
                />
                <Stack.Screen
                  name="RevelacoesEditForm"
                  component={RevelacoesEditForm}
                />
                <Stack.Screen
                  name="RevelacoesConcluir"
                  component={RevelacoesConcluir}
                />

                <Stack.Screen
                  name="CronometroScreen"
                  component={CronometroScreen}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={LogInScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen
                  name="Forgot Password"
                  component={ForgotPasswordScreen}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </>
  );
}
