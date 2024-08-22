import type { StyleProp, ViewStyle } from "react-native";
import React, { PropsWithChildren } from "react";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type PressableScaleProps = {
  onPress: () => void;
  style: StyleProp<ViewStyle>;
};

export const PressableScale = ({
  children,
  onPress,
  style,
}: PropsWithChildren<Partial<PressableScaleProps>>) => {
  const scale = useSharedValue(1);

  const gesture = Gesture.Tap()
    .maxDuration(1000)
    .onTouchesDown(() => {
      scale.value = withTiming(0.9);
    })
    .onTouchesUp(() => {
      if (onPress) {
        runOnJS(onPress)();
      }
    })
    .onFinalize(() => {
      scale.value = withTiming(1);
    });

  const rButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[style, rButtonStyle]}>{children}</Animated.View>
    </GestureDetector>
  );
};
