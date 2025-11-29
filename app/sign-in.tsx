import { CustomInput } from "@/components/general/CustomInput";
import { GradientButton } from "@/components/general/GradientButton";
import RefractiveGlass from "@/components/general/RefractiveGlass";
import LoginSwitchButton from "@/components/sign-in/LoginSwitchButton";
import OrDivider from "@/components/sign-in/OrDivider";
import SocialLoginButton from "@/components/sign-in/SocialLoginButton";
import { useState } from "react";
import { View, Keyboard, TouchableWithoutFeedback } from "react-native";

export default function SignInScreen() {
  const [isRegistering, setIsRegistering] = useState(true);

  const handleAuthModeChange = (isSignUp: boolean) => {
    setIsRegistering(isSignUp);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-center items-center px-6">
        <RefractiveGlass 
          className="w-full p-6" 
          intensity={20}
          borderRadius={30}
          borderOpacity={0.3}
        >
          <LoginSwitchButton onToggle={handleAuthModeChange} />
          <CustomInput placeholder="Email address" className="mb-4"/>
          <CustomInput placeholder="Password" className="mb-6"/>
          <GradientButton 
            title={isRegistering ? "Create Account" : "Log In"} 
            className="h-14" 
            textClasses="text-white text-center font-poppins-bold text-[18px]"
          />
          
          <OrDivider />
        
          <View className="flex-row justify-center items-center gap-4">
            <SocialLoginButton 
              provider="apple" 
              onPress={() => handleSocialLogin("Apple")}
            />
            <SocialLoginButton 
              provider="google" 
              onPress={() => handleSocialLogin("Google")}
            />
            <SocialLoginButton 
              provider="spotify" 
              onPress={() => handleSocialLogin("Spotify")}
            />
          </View>
        </RefractiveGlass>
      </View>
    </TouchableWithoutFeedback>
  );
}