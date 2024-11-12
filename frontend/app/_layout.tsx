// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { UserProvider } from '../components/features/users/providers/UserProvider';
import { CreateUserProvider } from '../components/features/users/providers/CreateUserProvider';
import { DeleteUserProvider } from '../components/features/users/providers/DeleteUserProvider';
import { EditUserProvider } from '../components/features/users/providers/EditUserProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider>
      <CreateUserProvider>
        <DeleteUserProvider>
          <EditUserProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              {/* Aquí se maneja la navegación implícita con expo-router */}
              <></>
            </ThemeProvider>
          </EditUserProvider>
        </DeleteUserProvider>
      </CreateUserProvider>
    </UserProvider>
  );
}
