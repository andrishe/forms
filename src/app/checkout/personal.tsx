import { ScrollView, StyleSheet, Text, View } from 'react-native';

import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import CustomTextInput from '../../components/CustomTextInput';

import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CheckoutFormProvider, {
  PersonalInfo,
  PersonalInfoSchema,
} from '../../contexts/CheckoutFormProvider';
import { useCheckoutForm } from '../../contexts/CheckoutFormProvider';
import RNPickerSelect from 'react-native-picker-select';

export default function PersonalDetailsForm() {
  const { personalInfo, setPersonalInfo } = useCheckoutForm();
  const form = useForm<PersonalInfo>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: personalInfo,
  });

  const onNext: SubmitHandler<PersonalInfo> = (data) => {
    setPersonalInfo(data);
    router.push('/checkout/payment');
  };
  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <CustomTextInput
          name="fullName"
          label="Full name"
          placeholder="John Doe"
        />

        <CustomTextInput
          name="address"
          label="Address"
          placeholder="4 rue de paris"
        />

        <View style={{ flexDirection: 'row', gap: 5 }}>
          <CustomTextInput
            name="city"
            label="City"
            placeholder="City"
            containerStyle={{ flex: 1 }}
          />
          <CustomTextInput
            name="postcode"
            label="Post Code"
            placeholder="1234"
            inputMode="numeric"
            containerStyle={{ flex: 1 }}
          />
        </View>

        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          placeholder={{ label: 'Country' }}
          items={countries.map((country) => ({
            label: country.name,
            value: country.code,
          }))}
        />

        <CustomTextInput
          name="phone"
          label="Phone number"
          placeholder="0610234567"
          inputMode="tel"
        />

        <CustomButton
          title="Next"
          onPress={form.handleSubmit(onNext)}
          style={styles.button}
        />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    gap: 5,
  },
  button: {
    marginTop: 'auto',
    marginBottom: 20,
  },
});
