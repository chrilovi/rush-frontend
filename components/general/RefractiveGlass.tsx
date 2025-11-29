import React, { useState } from "react";
import { View, LayoutChangeEvent, StyleSheet } from "react-native";
import {
  Canvas,
  Rect,
  BackdropBlur,
  RoundedRect,
  LinearGradient,
  vec,
  Group,
  Fill,
  rrect, // Importiamo le funzioni per creare forme geometriche
  rect,
} from "@shopify/react-native-skia";

interface RefractiveGlassProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  borderRadius?: number;
  borderOpacity?: number;
}

const RefractiveGlass = ({
  children,
  className = "",
  intensity = 15,
  borderRadius = 30,
  borderOpacity = 0.2,
}: RefractiveGlassProps) => {
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  };

  // Creiamo l'oggetto geometrico per il ritaglio (Rounded Rectangle)
  // Utilizziamo derived value o calcolo diretto solo quando il layout è pronto
  const roundedClip = layout.width > 0 
    ? rrect(rect(0, 0, layout.width, layout.height), borderRadius, borderRadius)
    : undefined;

  const borderColors = [
    `rgba(255, 255, 255, ${borderOpacity + 0.3})`,
    `rgba(255, 255, 255, ${borderOpacity})`,
    `rgba(255, 255, 255, 0.05)`,
  ];

  return (
    <View 
      onLayout={onLayout} 
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius }}
    >
      {layout.width > 0 && roundedClip && (
        <Canvas style={StyleSheet.absoluteFill}>
          {/* 1. Gruppo con CLIP: Qui passiamo l'oggetto 'roundedClip' invece del JSX */}
          <Group clip={roundedClip}>
            
            {/* 2. BackdropBlur: Anche qui passiamo il clip per limitare la sfocatura all'area curva */}
            <BackdropBlur
              blur={intensity}
              clip={roundedClip}
            >
              <Fill color="rgba(0,0,0,0)" />
            </BackdropBlur>

            {/* 3. Tinta di riempimento (Dark Overlay) */}
            <Rect
              x={0}
              y={0}
              width={layout.width}
              height={layout.height}
              color="rgba(15, 23, 42, 0.6)"
            />
          </Group>

          {/* 4. Bordo Luminoso */}
          <RoundedRect
            x={1}
            y={1}
            width={layout.width - 2}
            height={layout.height - 2}
            r={borderRadius}
            style="stroke"
            strokeWidth={0.3}
          >
            <LinearGradient
              start={vec(0, 0)}
              end={vec(layout.width, layout.height)}
              colors={borderColors}
            />
          </RoundedRect>
        </Canvas>
      )}

      <View className="z-10">
        {children}
      </View>
    </View>
  );
};

export default RefractiveGlass;