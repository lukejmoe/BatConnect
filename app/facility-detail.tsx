import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "./supabase";

export default function FacilityDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [facility, setFacility] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFacility() {
      const { data, error } = await supabase
        .from('facilities')
        .select('*')
        .eq('id', id)
        .single();
      if (!error && data) setFacility(data);
      setLoading(false);
    }
    fetchFacility();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!facility) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Facility not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {facility.photo_url ? (
        <Image source={{ uri: facility.photo_url }} style={styles.heroImage} resizeMode="cover" />
      ) : (
        <View style={styles.heroCard}>
          <Text style={styles.heroIcon}>⚾</Text>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{facility.name}</Text>
          <Text style={styles.rating}>⭐ {facility.rating}</Text>
        </View>

        <Text style={styles.city}>📍 {facility.city}, AZ</Text>
        <Text style={styles.address}>{facility.address}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>${facility.price_per_hour}</Text>
            <Text style={styles.statLabel}>Per Hour</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{facility.tunnels || '–'}</Text>
            <Text style={styles.statLabel}>Tunnels</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{facility.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>
          {facility.name} is a premier batting cage facility located in {facility.city}, Arizona.
          Offering multiple lanes for players of all skill levels, from youth to advanced.
          All sessions include professional-grade pitching machines.
        </Text>

        <Text style={styles.sectionTitle}>What's Included</Text>
        <View style={styles.featureList}>
          {['Professional pitching machines', 'Helmets & batting gloves provided', 'On-site coaching available', 'Climate controlled facility', 'Open 7 days a week'].map((feature) => (
            <Text key={feature} style={styles.feature}>✅ {feature}</Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Hours</Text>
        <View style={styles.hoursBox}>
          {facility.hours ? (
            facility.hours.split(' | ').map((line: string, i: number) => (
              <Text key={i} style={styles.hoursText}>{line}</Text>
            ))
          ) : (
            <Text style={styles.hoursText}>Contact facility for hours</Text>
          )}
        </View>

        <TouchableOpacity style={styles.directionsButton} onPress={() => {
          const query = encodeURIComponent(`${facility.address}, ${facility.city}, AZ`);
          Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
        }}>
          <Text style={styles.directionsButtonText}>📍 Get Directions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bookButton} onPress={() => router.push("/booking")}>
          <Text style={styles.bookButtonText}>Book Now — ${facility.price_per_hour}/hr</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a" },
  loadingText: { color: "#aaaaaa", textAlign: "center", marginTop: 80, fontSize: 16 },
  heroImage: { width: "100%", height: 200 },
  heroCard: { backgroundColor: "#1d3557", height: 200, justifyContent: "center", alignItems: "center" },
  heroIcon: { fontSize: 72 },
  content: { padding: 24 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 },
  name: { fontSize: 24, fontWeight: "bold", color: "#ffffff", flex: 1, marginRight: 8 },
  rating: { fontSize: 16, color: "#f4c542", fontWeight: "bold" },
  city: { fontSize: 14, color: "#aaaaaa", marginBottom: 2 },
  address: { fontSize: 14, color: "#aaaaaa", marginBottom: 24 },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  statBox: { flex: 1, backgroundColor: "#1a1a1a", borderRadius: 12, padding: 16, alignItems: "center", borderWidth: 1, borderColor: "#333" },
  statValue: { fontSize: 22, fontWeight: "bold", color: "#e63946" },
  statLabel: { fontSize: 12, color: "#aaaaaa", marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#ffffff", marginBottom: 12 },
  description: { fontSize: 14, color: "#aaaaaa", lineHeight: 22, marginBottom: 24 },
  featureList: { marginBottom: 24, gap: 8 },
  feature: { fontSize: 14, color: "#ffffff" },
  hoursBox: { backgroundColor: "#1a1a1a", borderRadius: 12, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: "#333", gap: 8 },
  hoursText: { fontSize: 14, color: "#aaaaaa" },
  directionsButton: { backgroundColor: "#1d3557", paddingVertical: 16, borderRadius: 12, alignItems: "center", marginBottom: 12 },
  directionsButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
  bookButton: { backgroundColor: "#e63946", paddingVertical: 16, borderRadius: 12, alignItems: "center", marginBottom: 12 },
  bookButtonText: { color: "#ffffff", fontSize: 18, fontWeight: "bold" },
  backButton: { backgroundColor: "#1d3557", paddingVertical: 14, borderRadius: 12, alignItems: "center", marginBottom: 40 },
  backButtonText: { color: "#ffffff", fontWeight: "bold", fontSize: 16 },
});
