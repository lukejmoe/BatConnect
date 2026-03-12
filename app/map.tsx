import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "./supabase";

export default function Map() {
  const router = useRouter();
  const [facilities, setFacilities] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFacilities() {
      const { data, error } = await supabase.from('facilities').select('*');
      if (!error && data) setFacilities(data);
    }
    fetchFacilities();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Facilities Near You</Text>
      <ScrollView style={styles.list}>
        {facilities.map((facility) => (
          <View key={facility.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.facilityName}>{facility.name}</Text>
              <Text style={styles.rating}>⭐ {facility.rating}</Text>
            </View>
            <Text style={styles.location}>📍 {facility.city}</Text>
            <Text style={styles.address}>{facility.address}</Text>
            <Text style={styles.price}>${facility.price_per_hour}/hr</Text>
            <TouchableOpacity style={styles.bookButton} onPress={() => router.push("/booking")}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back to List</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a", padding: 24, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: "bold", color: "#ffffff", marginBottom: 16 },
  list: { flex: 1 },
  card: { backgroundColor: "#1a1a1a", borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: "#333" },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  facilityName: { fontSize: 16, fontWeight: "bold", color: "#ffffff", flex: 1, marginRight: 8 },
  rating: { fontSize: 14, color: "#f4c542" },
  location: { fontSize: 13, color: "#aaaaaa", marginBottom: 2 },
  address: { fontSize: 13, color: "#aaaaaa", marginBottom: 4 },
  price: { fontSize: 14, color: "#e63946", fontWeight: "bold", marginBottom: 12 },
  bookButton: { backgroundColor: "#e63946", paddingVertical: 10, borderRadius: 8, alignItems: "center" },
  bookButtonText: { color: "#ffffff", fontWeight: "bold", fontSize: 14 },
  backButton: { backgroundColor: "#1d3557", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 12 },
  backButtonText: { color: "#ffffff", fontWeight: "bold", fontSize: 16 },
});
