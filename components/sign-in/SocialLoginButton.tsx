import { Pressable, PressableProps } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

type SocialProvider = "apple" | "google" | "spotify";

interface SocialLoginButtonProps extends PressableProps {
  provider: SocialProvider;
  className?: string;
}

export default function SocialLoginButton({ 
  provider, 
  className = "",
  ...props 
}: SocialLoginButtonProps) {
  
  const renderIcon = () => {
    switch (provider) {
      case "apple":
        return <Ionicons name="logo-apple" size={24} color="white" />;
      case "google":
        return <Ionicons name="logo-google" size={24} color="white" />;
      case "spotify":
        return <FontAwesome name="spotify" size={24} color="white" />;
      default:
        return <Ionicons name="logo-apple" size={24} color="white" />;
    }
  };

  return (
    <Pressable 
      className={`w-14 h-14 rounded-full bg-white/5 border border-white/20 justify-center items-center active:opacity-70 ${className}`}
      {...props}
    >
      {renderIcon()}
    </Pressable>
  );
}