import { Stack } from 'expo-router';
import CheckoutFormProvider from '../../contexts/CheckoutFormProvider';
import CheckoutFormStepIndicator from '../../components/CheckoutFormStepIndicator';

export default function CheckoutLayout() {
  return (
    <CheckoutFormProvider>
      <CheckoutFormStepIndicator />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="personal" options={{ title: 'Personal ' }} />
        <Stack.Screen name="payment" options={{ title: 'Payment ' }} />
        <Stack.Screen name="confirm" options={{ title: 'Confirm ' }} />
      </Stack>
    </CheckoutFormProvider>
  );
}
