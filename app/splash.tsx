// app/splash.tsx
import { StyleSheet, Image, ActivityIndicator, Animated, ImageBackground } from 'react-native';
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/utils/authStore';

export default function SplashScreen() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animazione di entrata
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    const initializeApp = async () => {
      try {
        // Carica risorse
        await Promise.all([
          // checkAuth(),
          new Promise(resolve => setTimeout(resolve, 2000)), // Minimo 2 secondi
        ]);

        // Animazione di uscita
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          // Naviga dopo l'animazione
          if (isLoggedIn) {
            router.replace('/(tabs)');
          } else {
            router.replace('/sign-in');
          }
        });
      } catch (error) {
        console.error('Errore inizializzazione:', error);
        router.replace('/sign-in');
      }
    };

    initializeApp();
  }, []);

  return (
    <Animated.View 
      className="flex flex-1 items-center justify-center"
    >
      <Image 
        source={require('../assets/icons/splash-icon.png')} 
        className="w-full h-full mb-8"
        resizeMode="contain"
      />
    </Animated.View>
  );
}
