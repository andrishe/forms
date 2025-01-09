import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSegments } from 'expo-router';

const steps = [
  { key: 'personal', title: 'Personal' },
  { key: 'payment', title: 'Payment' },
  { key: 'confirm', title: 'Confirm' },
];

export default function CheckoutFormStepIndicator() {
  const segments = useSegments();
  const currentSegment = segments[segments.length - 1];

  const stepIndex = steps.findIndex((step) => step.key === currentSegment);
  return (
    <SafeAreaView
      edges={['top']}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',

        padding: 10,
        height: 110,
        gap: 15,
      }}
    >
      {steps.map((step, index) => (
        <View
          key={step.key}
          style={{
            borderBottomWidth: 3,
            borderColor: stepIndex >= index ? 'green' : 'gray',
            flex: 1,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              color: stepIndex >= index ? 'green' : 'gray',
            }}
          >
            {step.title}
          </Text>
        </View>
      ))}
    </SafeAreaView>
  );
}
