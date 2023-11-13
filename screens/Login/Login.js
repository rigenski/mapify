import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";

WebBrowser.maybeCompleteAuthSession();

export default function Login({ setIsLogin }) {
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "962460844138-pq13uk4c6et5ksslj3odfh21cfj44dep.apps.googleusercontent.com",
    androidClientId:
      "962460844138-6jugquaidblt8tpjhn0vkgfsnqeh70gc.apps.googleusercontent.com",
    iosClientId:
      "962460844138-e3f6hhd1iu711v9vmff4bs28fda480vp.apps.googleusercontent.com",
  });

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response?.authentication?.accessToken);
      }
      await getUserInfo();
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
      setIsLogin(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAuthLogin = async () => {
    promptAsync();
  };

  useEffect(() => {
    handleSignInWithGoogle();
  }, []);

  return (
    <View style={styles.form}>
      <View style={styles.formHeader}>
        <Text style={styles.formHeaderTitle}>Login</Text>
        <Text style={styles.formHeaderSubtitle}>Signin to join app</Text>
      </View>
      <TouchableOpacity style={styles.formButton} onPress={handleAuthLogin}>
        <Image
          source={require("./../../assets/icons/google.png")}
          style={styles.formButtonIcon}
        />
        <Text style={styles.formButtonText}>Login With Google</Text>
      </TouchableOpacity>
    </View>
  );
}
