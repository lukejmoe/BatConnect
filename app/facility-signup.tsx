  import { useRouter } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

  export default function FacilitySignup() {                                                                            
    const router = useRouter();
    return (                                                                                                            
      <View style={styles.container}>
        <Text style={styles.title}>List Your Facility</Text>
        <Text style={styles.subtitle}>Connect with players in your area</Text>

        <TextInput style={styles.input} placeholder="Facility Name" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Owner / Contact Name" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#888" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="#888" keyboardType="phone-pad" 
  />
        <TextInput style={styles.input} placeholder="Address" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#888" secureTextEntry />

        <TouchableOpacity style={styles.button} onPress={() => router.push("/facility-dashboard")}>   
          <Text style={styles.buttonText}>Create Facility Account</Text>
        </TouchableOpacity>

        <Text style={styles.login}>Already have an account? <Text style={styles.loginLink}>Log In</Text></Text>
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
      fontSize: 28,
      fontWeight: "bold",
      color: "#ffffff",
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: "#aaaaaa",
      marginBottom: 32,
      textAlign: "center",
    },
    input: {
      width: "100%",
      backgroundColor: "#1a1a1a",
      color: "#ffffff",
      padding: 16,
      borderRadius: 10,
      marginBottom: 12,
      fontSize: 16,
      borderWidth: 1,
      borderColor: "#333",
    },
    button: {
      backgroundColor: "#1d3557",
      paddingVertical: 16,
      borderRadius: 12,
      width: "100%",
      alignItems: "center",
      marginTop: 8,
    },
    buttonText: {
      color: "#ffffff",
      fontSize: 18,
      fontWeight: "bold",
    },
    login: {
      color: "#aaaaaa",
      marginTop: 24,
      fontSize: 14,
    },
    loginLink: {
      color: "#1d3557",
      fontWeight: "bold",
    },
  });
