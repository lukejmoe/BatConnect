import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function BookingConfirmed() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>✅</Text>
      <Text style={styles.title}>Booking Confirmed!</Text>
      <Text style={styles.subtitle}>You're all set. See you at the cage!</Text>
      <View style={styles.card}>
        <Text style={styles.detail}>🏟 Diamond Strike Batting Cages</Text>
        <Text style={styles.detail}>📍 Austin, TX</Text>
        <Text style={styles.detail}>📅 March 11 at 9:00 AM</Text>
        <Text style={styles.detail}>🏷 Lane 1</Text>
        <Text style={styles.detail}>💵 $20</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/player-dashboard")}>
        <Text style={styles.buttonText}>Back to Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a", padding: 24, paddingTop: 80, alignItems: "center" },
  icon: { fontSize: 64, marginBottom: 16 },
  title: { fontSize: 32, fontWeight: "bold", color: "#ffffff", marginBottom: 8, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#aaaaaa", marginBottom: 32, textAlign: "center" },
  card: { backgroundColor: "#1a1a1a", borderRadius: 12, padding: 20, width: "100%", borderWidth: 1, borderColor: "#333", marginBottom: 32, gap: 10 },
  detail: { fontSize: 15, color: "#ffffff" },
  button: { backgroundColor: "#e63946", paddingVertical: 16, borderRadius: 12, width: "100%", alignItems: "center" },
  buttonText: { color: "#ffffff", fontSize: 18, fontWeight: "bold" },
});
