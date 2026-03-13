import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "./supabase";

export default function BookingHistory() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('player_id', user?.id)
        .order('created_at', { ascending: false });
      if (!error && data) setBookings(data);
      setLoading(false);
    }
    fetchBookings();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
      <Text style={styles.subtitle}>Your booking history</Text>

      {loading ? (
        <Text style={styles.loadingText}>Loading bookings...</Text>
      ) : bookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No bookings yet</Text>
          <Text style={styles.emptySubtext}>Book a batting cage to get started!</Text>
          <TouchableOpacity style={styles.findButton} onPress={() => router.push("/player-dashboard")}>
            <Text style={styles.findButtonText}>Find a Cage</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
          {bookings.map((booking) => (
            <View key={booking.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.lane}>{booking.lane}</Text>
                <Text style={[
                  styles.status,
                  booking.status === 'Confirmed' ? styles.confirmed : styles.pending
                ]}>
                  {booking.status}
                </Text>
              </View>
              <Text style={styles.detail}>📅 {booking.date} at {booking.time}</Text>
              <Text style={styles.createdAt}>Booked on {new Date(booking.created_at).toLocaleDateString()}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a", padding: 24, paddingTop: 60 },
  title: { fontSize: 32, fontWeight: "bold", color: "#ffffff", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#aaaaaa", marginBottom: 24 },
  loadingText: { color: "#aaaaaa", textAlign: "center", marginTop: 40, fontSize: 16 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 20, fontWeight: "bold", color: "#ffffff", marginBottom: 8 },
  emptySubtext: { fontSize: 14, color: "#aaaaaa", marginBottom: 24 },
  findButton: { backgroundColor: "#e63946", paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12 },
  findButtonText: { color: "#ffffff", fontWeight: "bold", fontSize: 16 },
  list: { flex: 1 },
  card: { backgroundColor: "#1a1a1a", borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: "#333" },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  lane: { fontSize: 16, fontWeight: "bold", color: "#ffffff" },
  status: { fontSize: 12, fontWeight: "bold", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  confirmed: { backgroundColor: "#1a472a", color: "#4caf50" },
  pending: { backgroundColor: "#3d2b00", color: "#f4c542" },
  detail: { fontSize: 13, color: "#aaaaaa", marginBottom: 4 },
  createdAt: { fontSize: 12, color: "#555", marginTop: 4 },
  backButton: { backgroundColor: "#1d3557", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 12 },
  backButtonText: { color: "#ffffff", fontWeight: "bold", fontSize: 16 },
});
