import { Stack } from "expo-router";
import "./globals.css";
import { useAuthStore } from "@/utils/authStore";
import { ImageBackground, View, ActivityIndicator, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Asset } from "expo-asset";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from 'expo-font';

const SCREEN_OPTIONS_SPLASH = {
    headerShown: false,
    contentStyle: { 
        backgroundColor: 'transparent',
        paddingHorizontal: 64 
    }
};

const SCREEN_OPTIONS_ALL = {
    headerShown: false,
    contentStyle: { 
        backgroundColor: 'transparent',
        paddingHorizontal: 24
    }
};

export default function RootLayout() {
    const { isLoggedIn } = useAuthStore();
    const [assetsLoaded, setAssetsLoaded] = useState(false);

    const [fontsLoaded] = useFonts({
        'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
        'Poppins-BlackItalic': require('../assets/fonts/Poppins-BlackItalic.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-BoldItalic': require('../assets/fonts/Poppins-BoldItalic.ttf'),
        'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-ExtraBoldItalic': require('../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
        'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
        'Poppins-ExtraLightItalic': require('../assets/fonts/Poppins-ExtraLightItalic.ttf'),
        'Poppins-Italic': require('../assets/fonts/Poppins-Italic.ttf'),
        'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
        'Poppins-LightItalic': require('../assets/fonts/Poppins-LightItalic.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-MediumItalic': require('../assets/fonts/Poppins-MediumItalic.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-SemiBoldItalic': require('../assets/fonts/Poppins-SemiBoldItalic.ttf'),
        'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
        'Poppins-ThinItalic': require('../assets/fonts/Poppins-ThinItalic.ttf'),
    });

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
    if (!assetsLoaded && !fontsLoaded) {
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
            <SafeAreaView className="flex-1">
                <Stack>
                    {/* Post Login */} 
                    <Stack.Protected guard={isLoggedIn}>
                        <Stack.Screen name="(tabs)" options={SCREEN_OPTIONS_ALL}/>
                    </Stack.Protected>

                    {/* Pre Login */} 
                    <Stack.Protected guard={!isLoggedIn}>
                        <Stack.Screen name="splash" options={SCREEN_OPTIONS_SPLASH}/>
                        <Stack.Screen name="sign-in" options={SCREEN_OPTIONS_ALL}/>
                    </Stack.Protected>
                </Stack>
            </SafeAreaView>
        </ImageBackground>        
    );
}
