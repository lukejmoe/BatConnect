import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51T9rwgAZppQ5LqQpM5WioTD0xgvusKYFvgHhbx9PUKnngHiruxknXbWPkGvBI45nN5CpgvWlsNgNPyKEz0SVroeO00zTmMdxaP");

export default function Payment() {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  async function handlePayment() {
    if (!cardNumber || !expiry || !cvv || !name) {
      Alert.alert('Missing Info', 'Please fill in all card details.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 2000 }),
      });
      const { clientSecret, error: apiError } = await response.json();
      if (apiError) throw new Error(apiError);

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const [expMonth, expYear] = expiry.split('/');
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            number: cardNumber.replace(/\s/g, ''),
            exp_month: parseInt(expMonth),
            exp_year: parseInt('20' + expYear),
            cvc: cvv,
          },
          billing_details: { name },
        },
      });

      if (error) {
        Alert.alert('Payment Failed', error.message || 'Something went wrong.');
      } else if (paymentIntent.status === 'succeeded') {
        router.push("/booking-confirmed");
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Payment failed.');
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.subtitle}>Diamond Strike Batting Cages</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>🏟 Lane 1</Text>
        <Text style={styles.summaryText}>📅 Mar 12 at 9:00 AM</Text>
        <Text style={styles.summaryTotal}>Total: $20.00</Text>
      </View>

      <Text style={styles.sectionTitle}>Card Details</Text>
      <TextInput style={styles.input} placeholder="Name on Card" placeholderTextColor="#888" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Card Number" placeholderTextColor="#888" keyboardType="numeric" maxLength={16} value={cardNumber} onChangeText={setCardNumber} />
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.halfInput]} placeholder="MM/YY" placeholderTextColor="#888" maxLength={5} value={expiry} onChangeText={setExpiry} />
        <TextInput style={[styles.input, styles.halfInput]} placeholder="CVV" placeholderTextColor="#888" keyboardType="numeric" maxLength={3} value={cvv} onChangeText={setCvv} secureTextEntry />
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePayment} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Processing..." : "Pay $20.00"}</Text>
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
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#ffffff", marginBottom: 12 },
  input: { width: "100%", backgroundColor: "#1a1a1a", color: "#ffffff", padding: 16, borderRadius: 10, marginBottom: 12, fontSize: 16, borderWidth: 1, borderColor: "#333" },
  row: { flexDirection: "row", gap: 12 },
  halfInput: { flex: 1 },
  button: { backgroundColor: "#e63946", paddingVertical: 16, borderRadius: 12, width: "100%", alignItems: "center", marginTop: 8 },
  buttonText: { color: "#ffffff", fontSize: 18, fontWeight: "bold" },
  secure: { color: "#aaaaaa", textAlign: "center", marginTop: 16, fontSize: 13 },
});
