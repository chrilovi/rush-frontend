import { Stack } from "expo-router";
import "./globals.css";
import { useAuthStore } from "@/utils/authStore";
import { ImageBackground, View, ActivityIndicator, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Asset } from "expo-asset";

const SCREEN_OPTIONS = {
    headerShown: false,
    contentStyle: { 
        backgroundColor: 'transparent',
        paddingHorizontal: 64 
    }
};

export default function RootLayout() {
    const { isLoggedIn } = useAuthStore();
    const [assetsLoaded, setAssetsLoaded] = useState(false);

    useEffect(() => {
        const loadAssets = async () => {
            try {
                // Precarica tutte le immagini critiche
                await Promise.all([
                    Asset.fromModule(require('../assets/images/background.png')).downloadAsync(),
                    Asset.fromModule(require('../assets/icons/splash-icon.png')).downloadAsync(),
                ]);
                
                setAssetsLoaded(true);
            } catch (error) {
                console.error('Errore caricamento asset:', error);
                setAssetsLoaded(true);
            }
        };

        loadAssets();
    }, []);

    // Mostra loader finché tutto non è pronto
    if (!assetsLoaded) {
        return (
            <View className="flex flex-1 items-center justify-center bg-black">
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    return (
        <ImageBackground
            source={require('../assets/images/background.png')}
            className="flex flex-1 w-full h-full"
            resizeMode="cover"
        >
            <Stack screenOptions={SCREEN_OPTIONS}>
                {/* Post Login */} 
                <Stack.Protected guard={isLoggedIn}>
                    <Stack.Screen name="(tabs)" />
                </Stack.Protected>

                {/* Pre Login */} 
                <Stack.Protected guard={!isLoggedIn}>
                    <Stack.Screen name="splash" />
                    <Stack.Screen name="sign-in" />
                </Stack.Protected>
            </Stack>
        </ImageBackground>        
    );
}
