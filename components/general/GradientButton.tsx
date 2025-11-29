import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { StyleSheet, Pressable, PressableProps, Text } from 'react-native';
import { View } from 'react-native-reanimated/lib/typescript/Animated';

interface GradientButtonProps extends PressableProps {
  title: string;
  className?: string;
  textClasses: string;
}

export function GradientButton({ 
  title,
  className,
  textClasses,
  ...props 
}: GradientButtonProps) {
  return (
    <Pressable {...props} className={`w-full active:opacity-80 ${className ?? ''}`}>
      <LinearGradient
        colors={[colors.primary.dark, colors.primary.DEFAULT]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={
          { flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 9999}
        }
      >
        <Text className={textClasses}>
          {title}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}
