import { View, Text } from "react-native";

interface OrDividerProps {
  className?: string;
  text?: string;
}

export default function OrDivider({ 
  className = "", 
  text = "OR" 
}: OrDividerProps) {
  return (
    <View className={`flex-row items-center mt-6 mb-6 ${className}`}>
      <View className="flex-1 h-[1px] bg-white/10" />
      <Text className="mx-4 text-white/50 font-poppins-regular text-[12px]">
        {text}
      </Text>
      <View className="flex-1 h-[1px] bg-white/10" />
    </View>
  );
}