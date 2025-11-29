import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { GradientButton } from "../general/GradientButton";

interface LoginSwitchButtonProps {
  className?: string;
  onToggle?: (isSignUp: boolean) => void;
}

const LoginSwitchButton = ({
  className = "",
  onToggle
}: LoginSwitchButtonProps) => {
  const [isSignUp, setIsSignUp] = useState(true);

  const handleToggle = (signUp: boolean) => {
    setIsSignUp(signUp);
    onToggle?.(signUp);
  };

  return (
    <View className={`flex-row items-center w-full rounded-full bg-black/20 h-16 p-2 mb-8${className}`}>
      {/* Sign Up Button */}
      {isSignUp ? (
        <View className="flex-1 h-full">
          <GradientButton 
            title="Sign Up" 
            className="flex-1 h-full"
            textClasses="text-white text-center font-poppins-bold text-[14px]"
            onPress={() => handleToggle(true)}
          />
        </View>
      ) : (
        <Pressable 
          className="flex-1 h-full justify-center items-center"
          onPress={() => handleToggle(true)}
        >
          <Text className="text-center font-poppins-bold text-[14px] text-white/70">
            Sign Up
          </Text>
        </Pressable>
      )}

      {/* Log In Button */}
      {!isSignUp ? (
        <View className="flex-1 h-full">
          <GradientButton 
            title="Log In"
            className="flex-1 h-full"
            textClasses="text-white text-center font-poppins-bold text-[14px]"
            onPress={() => handleToggle(false)}
          />
        </View>
      ) : (
        <Pressable 
          className="flex-1 h-full justify-center items-center"
          onPress={() => handleToggle(false)}
        >
          <Text className="text-center font-poppins-bold text-[14px] text-white/70">
            Log In
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default LoginSwitchButton;