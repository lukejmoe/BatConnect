import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "./supabase";

export default function FacilityDashboard() {
  const router = useRouter();
  const [facility, setFacility] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [editing, setEditing] = useState(false);
  const [price, setPrice] = useState('');
  const [hours, setHours] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: facilityData } = await supabase
        .from('facilities')
        .select('*')
        .eq('email', user.email)
        .single();

      if (facilityData) {
        setFacility(facilityData);
        setPrice(String(facilityData.price_per_hour || ''));
        setHours(facilityData.hours || '');

        const { data: bookingData } = await supabase
          .from('bookings')
          .select('*')
          .eq('facility_id', facilityData.id)
          .order('created_at', { ascending: false });

        if (bookingData) setBookings(bookingData);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  async function handleSave() {
    const { error } = await supabase
      .from('facilities')
      .update({ price_per_hour: parseFloat(price), hours })
      .eq('id', facility.id);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      setFacility({ ...facility, price_per_hour: parseFloat(price), hours });
      setEditing(false);
      Alert.alert('Saved!', 'Your facility info has been updated.');
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Facility Dashboard</Text>
          <Text style={styles.subtitle}>{facility?.name || 'Your Facility'}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{bookings.length}</Text>
          <Text style={styles.statLabel}>Total Bookings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{facility?.tunnels || '–'}</Text>
          <Text style={styles.statLabel}>Tunnels</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>${facility?.price_per_hour || 0}</Text>
          <Text style={styles.statLabel}>Per Hour</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Facility Info</Text>
          <TouchableOpacity onPress={() => setEditing(!editing)}>
            <Text style={styles.editLink}>{editing ? 'Cancel' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>

        {editing ? (
          <>
            <Text style={styles.label}>Price Per Hour ($)</Text>
            <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" placeholderTextColor="#888" />
            <Text style={styles.label}>Hours</Text>
            <TextInput style={styles.input} value={hours} onChangeText={setHours} placeholderTextColor="#888" multiline />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>📍 {facility?.address}, {facility?.city}</Text>
            <Text style={styles.infoText}>💵 ${facility?.price_per_hour}/hr</Text>
            <Text style={styles.infoText}>🕐 {facility?.hours || 'No hours set'}</Text>
            <Text style={styles.infoText}>📞 {facility?.phone || 'No phone set'}</Text>
          </View>
        )}
      </View>

      <Text style={styles.sectionTitle}>Recent Bookings</Text>
      {bookings.length === 0 ? (
        <Text style={styles.emptyText}>No bookings yet.</Text>
      ) : (
        bookings.map((booking) => (
          <View key={booking.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.lane}>{booking.lane}</Text>
              <Text style={[styles.status, booking.status === 'Confirmed' ? styles.confirmed : styles.pending]}>
                {booking.status}
              </Text>
            </View>
            <Text style={styles.detail}>📅 {booking.date} at {booking.time}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a", padding: 24, paddingTop: 60 },
  loadingText: { color: "#aaaaaa", textAlign: "center", marginTop: 80, fontSize: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 },
  title: { fontSize: 28, fontWeight: "bold", color: "#ffffff" },
  subtitle: { fontSize: 14, color: "#aaaaaa", marginTop: 4 },
  logoutButton: { backgroundColor: "#1a1a1a", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, borderWidth: 1, borderColor: "#333" },
  logoutText: { color: "#e63946", fontWeight: "bold", fontSize: 13 },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: "#1a1a1a", borderRadius: 12, padding: 14, alignItems: "center", borderWidth: 1, borderColor: "#333" },
  statNumber: { fontSize: 22, fontWeight: "bold", color: "#e63946" },
  statLabel: { fontSize: 11, color: "#aaaaaa", marginTop: 4, textAlign: "center" },
  section: { backgroundColor: "#1a1a1a", borderRadius: 12, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: "#333" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#ffffff", marginBottom: 12 },
  editLink: { color: "#e63946", fontWeight: "bold", fontSize: 14 },
  label: { color: "#aaaaaa", fontSize: 13, marginBottom: 6 },
  input: { backgroundColor: "#0a0a0a", color: "#ffffff", padding: 14, borderRadius: 10, marginBottom: 12, fontSize: 15, borderWidth: 1, borderColor: "#444" },
  saveButton: { backgroundColor: "#e63946", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  saveButtonText: { color: "#ffffff", fontWeight: "bold", fontSize: 15 },
  infoBox: { gap: 8 },
  infoText: { fontSize: 14, color: "#aaaaaa" },
  emptyText: { color: "#555", textAlign: "center", marginTop: 12, marginBottom: 24 },
  card: { backgroundColor: "#1a1a1a", borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: "#333" },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  lane: { fontSize: 15, fontWeight: "bold", color: "#ffffff" },
  status: { fontSize: 12, fontWeight: "bold", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  confirmed: { backgroundColor: "#1a472a", color: "#4caf50" },
  pending: { backgroundColor: "#3d2b00", color: "#f4c542" },
  detail: { fontSize: 13, color: "#aaaaaa" },
});
