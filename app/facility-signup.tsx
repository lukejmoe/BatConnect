import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "./supabase";

export default function FacilitySignup() {
  const router = useRouter();
  const [facilityName, setFacilityName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!facilityName || !ownerName || !email || !password || !address || !city) {
      Alert.alert('Missing Info', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name: ownerName, role: 'facility' }
        }
      });
      if (authError) throw authError;

      const { error: facilityError } = await supabase.from('facilities').insert({
        name: facilityName,
        owner_name: ownerName,
        email,
        phone,
        address,
        city,
        price_per_hour: 0,
        rating: 0,
      });
      if (facilityError) throw facilityError;

      router.push("/facility-dashboard");
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
    setLoading(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>List Your Facility</Text>
      <Text style={styles.subtitle}>Connect with players in your area</Text>

      <TextInput style={styles.input} placeholder="Facility Name" placeholderTextColor="#888" value={facilityName} onChangeText={setFacilityName} />
      <TextInput style={styles.input} placeholder="Owner / Contact Name" placeholderTextColor="#888" value={ownerName} onChangeText={setOwnerName} />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#888" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="#888" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      <TextInput style={styles.input} placeholder="Address" placeholderTextColor="#888" value={address} onChangeText={setAddress} />
      <TextInput style={styles.input} placeholder="City" placeholderTextColor="#888" value={city} onChangeText={setCity} />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#888" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Creating..." : "Create Facility Account"}</Text>
      </TouchableOpacity>

      <Text style={styles.login}>Already have an account? <Text style={styles.loginLink} onPress={() => router.push("/login")}>Log In</Text></Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0a0a0a", padding: 24 },
  title: { fontSize: 28, fontWeight: "bold", color: "#ffffff", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#aaaaaa", marginBottom: 32, textAlign: "center" },
  input: { width: "100%", backgroundColor: "#1a1a1a", color: "#ffffff", padding: 16, borderRadius: 10, marginBottom: 12, fontSize: 16, borderWidth: 1, borderColor: "#333" },
  button: { backgroundColor: "#1d3557", paddingVertical: 16, borderRadius: 12, width: "100%", alignItems: "center", marginTop: 8 },
  buttonText: { color: "#ffffff", fontSize: 18, fontWeight: "bold" },
  login: { color: "#aaaaaa", marginTop: 24, fontSize: 14 },
  loginLink: { color: "#e63946", fontWeight: "bold" },
});
