import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "./supabase";
                                                                                                                                                            
  export default function PlayerSignup() {                                                                                                                  
    const router = useRouter();                             
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignup() {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, city, role: 'player' }
        }
      });
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        router.push("/player-dashboard");
      }
      setLoading(false);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create Player Account</Text>
        <Text style={styles.subtitle}>Find and book batting cages near you</Text>

        <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#888" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#888" keyboardType="email-address" value={email} onChangeText={setEmail} 
  />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#888" secureTextEntry value={password} onChangeText={setPassword} />
        <TextInput style={styles.input} placeholder="City or Zip Code" placeholderTextColor="#888" value={city} onChangeText={setCity} />

        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Creating..." : "Create Account"}</Text>
        </TouchableOpacity>

        <Text style={styles.login}>Already have an account? <Text style={styles.loginLink} onPress={() => router.push("/login")}>Log In</Text></Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0a0a0a", padding: 24 },
    title: { fontSize: 28, fontWeight: "bold", color: "#ffffff", marginBottom: 8 },
    subtitle: { fontSize: 14, color: "#aaaaaa", marginBottom: 32, textAlign: "center" },
    input: { width: "100%", backgroundColor: "#1a1a1a", color: "#ffffff", padding: 16, borderRadius: 10, marginBottom: 12, fontSize: 16, borderWidth: 1,
  borderColor: "#333" },
    button: { backgroundColor: "#e63946", paddingVertical: 16, borderRadius: 12, width: "100%", alignItems: "center", marginTop: 8 },
    buttonText: { color: "#ffffff", fontSize: 18, fontWeight: "bold" },
    login: { color: "#aaaaaa", marginTop: 24, fontSize: 14 },
    loginLink: { color: "#e63946", fontWeight: "bold" },
  });