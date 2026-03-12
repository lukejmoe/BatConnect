import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "./supabase";
                                                                                                                                                            
  export default function Login() {                                                                                                                         
    const router = useRouter();                             
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
      if (!email || !password) {
        Alert.alert('Missing Info', 'Please enter your email and password.');
        return;
      }
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        const role = data.user?.user_metadata?.role;
        if (role === 'facility') {
          router.push("/facility-dashboard");
        } else {
          router.push("/player-dashboard");
        }
      }
      setLoading(false);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>⚾ BatConnect</Text>
        <Text style={styles.subtitle}>Welcome back</Text>

        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#888" keyboardType="email-address" value={email} onChangeText={setEmail} 
  />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#888" secureTextEntry value={password} onChangeText={setPassword} />

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Logging in..." : "Log In"}</Text>
        </TouchableOpacity>

        <Text style={styles.signup}>Don't have an account? <Text style={styles.signupLink} onPress={() => router.push("/")}>Sign Up</Text></Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0a0a0a", padding: 24 },
    title: { fontSize: 40, fontWeight: "bold", color: "#ffffff", marginBottom: 8 },
    subtitle: { fontSize: 16, color: "#aaaaaa", marginBottom: 48, textAlign: "center" },
    input: { width: "100%", backgroundColor: "#1a1a1a", color: "#ffffff", padding: 16, borderRadius: 10, marginBottom: 12, fontSize: 16, borderWidth: 1,
  borderColor: "#333" },
    button: { backgroundColor: "#e63946", paddingVertical: 16, borderRadius: 12, width: "100%", alignItems: "center", marginTop: 8 },
    buttonText: { color: "#ffffff", fontSize: 18, fontWeight: "bold" },
    signup: { color: "#aaaaaa", marginTop: 24, fontSize: 14 },
    signupLink: { color: "#e63946", fontWeight: "bold" },
  });