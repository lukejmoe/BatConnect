  import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
                                                                                                                        
   export default function Index() {
    const router = useRouter();

    return (
      <View style={styles.container}>
        <Text style={styles.title}>⚾ BatConnect</Text>
        <Text style={styles.subtitle}>Find & book batting cages near you</Text>

        <TouchableOpacity style={styles.buttonPrimary} onPress={() => router.push("/player-signup")}>
          <Text style={styles.buttonText}>I'm a Player</Text>
        </TouchableOpacity>

         <TouchableOpacity style={styles.buttonSecondary} onPress={() => router.push("/facility-signup")}>
    <Text style={styles.buttonText}>I'm a Facility</Text>
  </TouchableOpacity>
      </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#0a0a0a",
      padding: 24,
    },
    title: {
      fontSize: 40,
      fontWeight: "bold",
      color: "#ffffff",
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: "#aaaaaa",
      marginBottom: 48,
      textAlign: "center",
    },
    buttonPrimary: {
      backgroundColor: "#e63946",
      paddingVertical: 16,
      paddingHorizontal: 48,
      borderRadius: 12,
      marginBottom: 16,
      width: "100%",
      alignItems: "center",
    },
    buttonSecondary: {
      backgroundColor: "#1d3557",
      paddingVertical: 16,
      paddingHorizontal: 48,
      borderRadius: 12,
      width: "100%",
      alignItems: "center",
    },
    buttonText: {
      color: "#ffffff",
      fontSize: 18,
      fontWeight: "bold",
    },
  });
