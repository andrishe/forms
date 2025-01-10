import Checkbox from 'expo-checkbox';
import { useController } from 'react-hook-form';
import { View, Text } from 'react-native';

type CustomCheckbox = {
  name: string;
  label?: string;
};

export default function CustomCheckbox({ name, label }: CustomCheckbox) {
  const {
    field: { value, onChange },
  } = useController({ name });

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginVertical: 5,
      }}
    >
      <Checkbox style={{}} value={value} onValueChange={onChange} />
      <Text style={{}}>{label}</Text>
    </View>
  );
}
