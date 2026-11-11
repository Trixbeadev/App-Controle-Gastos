import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Meus Gastos',
        }}
      />

      <Stack.Screen
        name="cadastro"
        options={{
          title: 'Novo Gasto',
        }}
      />
    </Stack>
  );
}