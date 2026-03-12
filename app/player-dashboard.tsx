import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "./supabase";
                                                                                                                                                            
  export default function PlayerDashboard() {                                                                                                               
    const router = useRouter();                                                                                                                           
    const [facilities, setFacilities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchFacilities() {
        const { data, error } = await supabase.from('facilities').select('*');
        if (!error && data) setFacilities(data);
        setLoading(false);
      }
      fetchFacilities();
    }, []);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Find a Cage</Text>
          <TouchableOpacity style={styles.mapButton} onPress={() => router.push("/map")}>
            <Text style={styles.mapButtonText}>🗺 Map</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.searchBar}
          placeholder="Search by city or zip code..."
          placeholderTextColor="#888"
        />

        {loading ? (
          <Text style={styles.loadingText}>Loading facilities...</Text>
        ) : (
          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {facilities.map((facility) => (
              <View key={facility.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.facilityName}>{facility.name}</Text>
                  <Text style={styles.rating}>⭐ {facility.rating}</Text>
                </View>
                <Text style={styles.location}>📍 {facility.city}</Text>
                <Text style={styles.price}>${facility.price_per_hour}/hr</Text>
                <TouchableOpacity style={styles.bookButton} onPress={() => router.push("/booking")}>
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0a0a0a", padding: 24, paddingTop: 60 },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
    title: { fontSize: 32, fontWeight: "bold", color: "#ffffff" },
    mapButton: { backgroundColor: "#1d3557", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
    mapButtonText: { color: "#ffffff", fontWeight: "bold" },
    searchBar: { backgroundColor: "#1a1a1a", color: "#ffffff", padding: 16, borderRadius: 10, fontSize: 16, borderWidth: 1, borderColor: "#333",
  marginBottom: 24 },
    loadingText: { color: "#aaaaaa", textAlign: "center", marginTop: 40, fontSize: 16 },
    list: { flex: 1 },
    card: { backgroundColor: "#1a1a1a", borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: "#333" },
    cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
    facilityName: { fontSize: 16, fontWeight: "bold", color: "#ffffff", flex: 1, marginRight: 8 },
    rating: { fontSize: 14, color: "#f4c542" },
    location: { fontSize: 13, color: "#aaaaaa", marginBottom: 4 },
    price: { fontSize: 14, color: "#e63946", fontWeight: "bold", marginBottom: 12 },
    bookButton: { backgroundColor: "#e63946", paddingVertical: 10, borderRadius: 8, alignItems: "center" },
    bookButtonText: { color: "#ffffff", fontWeight: "bold", fontSize: 14 },
  });