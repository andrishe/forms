import { router } from 'expo-router';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import * as z from 'zod';

export const PersonalInfoSchema = z.object({
  fullName: z
    .string({ message: 'Full name is required!' })
    .min(1, { message: 'Full name must be longer than 1' }),
  address: z.string().min(1, { message: 'Please provide your address!' }),
  city: z.string().min(1, { message: 'City is required!' }),
  postcode: z.string().min(1, { message: 'Postal code is required!' }),
  country: z.string().length(2),
  phone: z.string().min(1, { message: 'Phone is required!' }),
  birthdate: z.date(),
});
export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;

export const PaymentInfoSchema = z.object({
  cardNumber: z.string().length(16),
  expireDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Please use the MM/YY format'),
  cvv: z.coerce.number().min(100).max(999),
  saveCard: z.boolean().optional(),
  switchValue: z.boolean().optional(),
});
export type PaymentInfo = z.infer<typeof PaymentInfoSchema>;

type CheckoutFormContext = {
  personalInfo: PersonalInfo | undefined;
  setPersonalInfo: (val: PersonalInfo | undefined) => void;
  paymentInfo: PaymentInfo | undefined;
  setPaymentInfo: (val: PaymentInfo | undefined) => void;
  onSubmit: () => void;
};

const CheckoutFormContext = createContext<CheckoutFormContext>({
  personalInfo: undefined,
  setPersonalInfo: () => {},
  paymentInfo: undefined,
  setPaymentInfo: () => {},
  onSubmit: () => {},
});

export default function CheckoutFormProvider({ children }: PropsWithChildren) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | undefined>();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | undefined>();

  const onSubmit = () => {
    if (!personalInfo || !paymentInfo) {
      console.log('The form is incomplete');
      return;
    }
    // send it to the server

    setPersonalInfo(undefined);
    setPaymentInfo(undefined);

    router.dismissAll();
    router.back();
  };

  return (
    <CheckoutFormContext.Provider
      value={{
        personalInfo,
        setPersonalInfo,
        paymentInfo,
        setPaymentInfo,
        onSubmit,
      }}
    >
      {children}
    </CheckoutFormContext.Provider>
  );
}

export const useCheckoutForm = () => useContext(CheckoutFormContext);
