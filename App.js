import { useState } from "react";
import { Text, View } from "react-native";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import styles from "./styles/style";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mapify</Text>
      </View>
      {isLogin ? (
        <Home setIsLogin={(val) => setIsLogin(val)} />
      ) : (
        <Login setIsLogin={(val) => setIsLogin(val)} />
      )}
    </View>
  );
}
