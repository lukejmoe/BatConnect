import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "./supabase";
                                                            
  const timeSlots = [                                                                                                                                       
    { id: "1", time: "9:00 AM", available: true },          
    { id: "2", time: "10:00 AM", available: false },
    { id: "3", time: "11:00 AM", available: true },
    { id: "4", time: "12:00 PM", available: true },
    { id: "5", time: "1:00 PM", available: false },
    { id: "6", time: "2:00 PM", available: true },
    { id: "7", time: "3:00 PM", available: true },
    { id: "8", time: "4:00 PM", available: true },
  ];

  export default function Booking() {
    const router = useRouter();
    const [selectedLane, setSelectedLane] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleConfirm() {
      if (!selectedLane || !selectedTime) {
        Alert.alert('Missing Info', 'Please select a lane and time.');
        return;
      }
      setLoading(true);
      const { error } = await supabase.from('bookings').insert({
        facility_id: null,
        lane: selectedLane,
        date: 'Mar 12',
        time: selectedTime,
        status: 'Confirmed',
      });
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        router.push("/payment" as any);
      }
      setLoading(false);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Diamond Strike Batting Cages</Text>
        <Text style={styles.location}>📍 Austin, TX</Text>
        <Text style={styles.price}>$20/hr • ⭐ 4.8</Text>
        <Text style={styles.sectionTitle}>Select a Lane</Text>
        <View style={styles.laneRow}>
          {["Lane 1", "Lane 2", "Lane 3"].map((lane) => (
            <TouchableOpacity
              key={lane}
              style={[styles.laneButton, selectedLane === lane && styles.laneSelected]}
              onPress={() => setSelectedLane(lane)}
            >
              <Text style={styles.laneText}>{lane}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Select a Time</Text>
        <ScrollView style={styles.slotList} showsVerticalScrollIndicator={false}>
          <View style={styles.slotGrid}>
            {timeSlots.map((slot) => (
              <TouchableOpacity
                key={slot.id}
                style={[styles.slot, !slot.available && styles.slotUnavailable, selectedTime === slot.time && styles.slotSelected]}
                disabled={!slot.available}
                onPress={() => setSelectedTime(slot.time)}
              >
                <Text style={[styles.slotText, !slot.available && styles.slotTextUnavailable]}>
                  {slot.time}
                </Text>
                {!slot.available && <Text style={styles.bookedLabel}>Booked</Text>}
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm} disabled={loading}>
            <Text style={styles.confirmText}>{loading ? "Saving..." : "Confirm Booking"}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0a0a0a", padding: 24, paddingTop: 60 },
    title: { fontSize: 24, fontWeight: "bold", color: "#ffffff", marginBottom: 4 },
    location: { fontSize: 14, color: "#aaaaaa", marginBottom: 4 },
    price: { fontSize: 14, color: "#e63946", fontWeight: "bold", marginBottom: 24 },
    sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#ffffff", marginBottom: 12 },
    laneRow: { flexDirection: "row", marginBottom: 24, gap: 12 },
    laneButton: { backgroundColor: "#1d3557", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
    laneSelected: { backgroundColor: "#e63946" },
    laneText: { color: "#ffffff", fontWeight: "bold" },
    slotList: { flex: 1 },
    slotGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 24 },
    slot: { backgroundColor: "#1a1a1a", borderRadius: 10, padding: 14, width: "45%", alignItems: "center", borderWidth: 1, borderColor: "#333" },
    slotUnavailable: { backgroundColor: "#111", borderColor: "#222", opacity: 0.5 },
    slotSelected: { borderColor: "#e63946", borderWidth: 2 },
    slotText: { color: "#ffffff", fontWeight: "bold", fontSize: 15 },
    slotTextUnavailable: { color: "#555" },
    bookedLabel: { color: "#555", fontSize: 11, marginTop: 4 },
    confirmButton: { backgroundColor: "#e63946", paddingVertical: 16, borderRadius: 12, alignItems: "center", marginBottom: 40 },
    confirmText: { color: "#ffffff", fontSize: 18, fontWeight: "bold" },
  });