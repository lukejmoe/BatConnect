import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Payment() {
  const router = useRouter();
  const { name, lane, time, price } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const facilityName = name ? decodeURIComponent(name as string) : 'Batting Cages';
  const facilityLane = lane ? decodeURIComponent(lane as string) : 'Lane 1';
  const facilityTime = time ? decodeURIComponent(time as string) : '';
  const pricePerHour = parseFloat(price as string) || 20;
  const amount = pricePerHour * 100;
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  async function handlePayment() {
    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          facilityName,
          lane: facilityLane,
          date: today,
          time: facilityTime,
        }),
      });
      const { url, error } = await response.json();
      if (error) throw new Error(error);
      if (url) window.location.href = url;
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Payment failed.');
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.subtitle}>{facilityName}</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>🏟 {facilityLane}</Text>
        <Text style={styles.summaryText}>📅 {today} at {facilityTime}</Text>
        <Text style={styles.summaryTotal}>Total: ${pricePerHour.toFixed(2)}</Text>
      </View>

      <Text style={styles.info}>
        You will be redirected to Stripe's secure payment page to complete your booking.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handlePayment} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Redirecting..." : `Pay $${pricePerHour.toFixed(2)}`}</Text>
      </TouchableOpacity>

      <Text style={styles.secure}>🔒 Secured by Stripe</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a", padding: 24, paddingTop: 60 },
  title: { fontSize: 32, fontWeight: "bold", color: "#ffffff", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#aaaaaa", marginBottom: 24 },
  summaryCard: { backgroundColor: "#1a1a1a", borderRadius: 12, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: "#333", gap: 6 },
  summaryText: { fontSize: 14, color: "#ffffff" },
  summaryTotal: { fontSize: 18, fontWeight: "bold", color: "#e63946", marginTop: 8 },
  info: { fontSize: 14, color: "#aaaaaa", marginBottom: 24, textAlign: "center", lineHeight: 22 },
  button: { backgroundColor: "#e63946", paddingVertical: 16, borderRadius: 12, width: "100%", alignItems: "center", marginTop: 8 },
  buttonText: { color: "#ffffff", fontSize: 18, fontWeight: "bold" },
  secure: { color: "#aaaaaa", textAlign: "center", marginTop: 16, fontSize: 13 },
});
