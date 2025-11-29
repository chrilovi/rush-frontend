import { TextInput } from 'react-native';

interface CustomInputProps {
  placeholder: string;
  className?: string;
}

export function CustomInput({ 
  placeholder,
  className,
  ...props 
}: CustomInputProps) {
  return (
    <TextInput
      placeholder={placeholder}
      className={`w-full h-16 px-4 bg-white/5 rounded-full text-white text-[16px] border border-white/10 ${className ?? ''}`}
      style={{ 
        fontFamily: 'Poppins-Regular',
      }}
      placeholderTextColor="rgba(255, 255, 255, 0.4)"
      {...props}
    />
  );
}