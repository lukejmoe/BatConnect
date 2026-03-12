import { ScrollView, StyleSheet, Text, View } from "react-native";

  const bookings = [                                                                                                    
    { id: "1", player: "Marcus Johnson", cage: "Lane 1", date: "Mar 11", time: "10:00 AM", status: "Confirmed" },
    { id: "2", player: "Tyler Brooks", cage: "Lane 2", date: "Mar 11", time: "11:30 AM", status: "Confirmed" },         
    { id: "3", player: "Jake Williams", cage: "Lane 1", date: "Mar 11", time: "1:00 PM", status: "Pending" },
    { id: "4", player: "Chris Davis", cage: "Lane 3", date: "Mar 12", time: "9:00 AM", status: "Confirmed" },
  ];

  export default function FacilityDashboard() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Facility Dashboard</Text>
        <Text style={styles.subtitle}>Diamond Strike Batting Cages</Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Today's Bookings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Lanes Active</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>$75</Text>
            <Text style={styles.statLabel}>Today's Revenue</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Upcoming Bookings</Text>

        <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
          {bookings.map((booking) => (
            <View key={booking.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.playerName}>{booking.player}</Text>
                <Text style={[
                  styles.status,
                  booking.status === "Confirmed" ? styles.confirmed : styles.pending
                ]}>
                  {booking.status}
                </Text>
              </View>
              <Text style={styles.detail}>🏟 {booking.cage}</Text>
              <Text style={styles.detail}>📅 {booking.date} at {booking.time}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0a0a0a",
      padding: 24,
      paddingTop: 60,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#ffffff",
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: "#aaaaaa",
      marginBottom: 24,
    },
    statsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 24,
    },
    statCard: {
      backgroundColor: "#1a1a1a",
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
      flex: 1,
      marginHorizontal: 4,
      borderWidth: 1,
      borderColor: "#333",
    },
    statNumber: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#e63946",
    },
    statLabel: {
      fontSize: 11,
      color: "#aaaaaa",
      textAlign: "center",
      marginTop: 4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#ffffff",
      marginBottom: 12,
    },
    list: {
      flex: 1,
    },
    card: {
      backgroundColor: "#1a1a1a",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: "#333",
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    playerName: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#ffffff",
    },
    status: {
      fontSize: 12,
      fontWeight: "bold",
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 6,
    },
    confirmed: {
      backgroundColor: "#1a472a",
      color: "#4caf50",
    },
    pending: {
      backgroundColor: "#3d2b00",
      color: "#f4c542",
    },
    detail: {
      fontSize: 13,
      color: "#aaaaaa",
      marginBottom: 4,
    },
  });

