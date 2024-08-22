import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Pallete } from "@/constants/palette";
import { PressableScale } from "./pressable-scale";

type SplitAction = {
  label: string;
  onPress: () => void;
  backgroundColor: string;
};

type SplitButtonProps = {
  splitted: boolean;
  mainAction: SplitAction;
  leftAction: SplitAction;
  rightAction: SplitAction;
};

const ButtonHeight = 60;

export const SplitButton = ({
  splitted,
  mainAction,
  leftAction,
  rightAction,
}: SplitButtonProps) => {
  const { width: windowWidth } = useWindowDimensions();

  const paddingHorizontal = 20;
  const gap = 10;
  const splittedButtonWidth = (windowWidth - paddingHorizontal * 2 - gap) / 2;

  const mainButtonWidth = splitted
    ? splittedButtonWidth
    : splittedButtonWidth * 2;

  const rMainButtonStyle = useAnimatedStyle(() => {
    const mainButtonWidth = splitted
      ? splittedButtonWidth
      : splittedButtonWidth * 2;
    return {
      width: withTiming(mainButtonWidth),
      marginLeft: withTiming(splitted ? gap : 0),
      backgroundColor: withTiming(
        splitted ? rightAction.backgroundColor : mainAction.backgroundColor
      ),
    };
  }, [splitted]);

  const rLeftButtonStyle = useAnimatedStyle(() => {
    const leftButtonWidth = splitted ? splittedButtonWidth : 0;
    return {
      width: withTiming(leftButtonWidth),
      opacity: withTiming(splitted ? 1 : 0),
    };
  }, [splitted]);

  const rLeftTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(splitted ? 1 : 0, {
        duration: 150,
      }),
    };
  }, [splitted]);

  const rMainTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(splitted ? 0 : 1),
    };
  }, [splitted]);

  const rRightTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(splitted ? 1 : 0),
    };
  }, [splitted]);

  return (
    <View style={styles.container}>
      <PressableScale
        onPress={leftAction.onPress}
        style={[
          styles.button,
          rLeftButtonStyle,
          {
            backgroundColor: leftAction.backgroundColor,
          },
        ]}
      >
        <Animated.Text numberOfLines={1} style={[styles.label, rLeftTextStyle]}>
          {leftAction.label}
        </Animated.Text>
      </PressableScale>
      <PressableScale
        onPress={splitted ? rightAction.onPress : mainAction.onPress}
        style={[
          styles.button,
          rMainButtonStyle,
          {
            width: mainButtonWidth,
          },
        ]}
      >
        <Animated.Text style={[styles.label, rMainTextStyle]}>
          {mainAction.label}
        </Animated.Text>
        <Animated.Text style={[styles.label, rRightTextStyle]}>
          {rightAction.label}
        </Animated.Text>
      </PressableScale>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: ButtonHeight,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  button: {
    height: ButtonHeight,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderCurve: "continuous",
  },
  label: {
    color: Pallete.text,
    fontSize: 16,
    textTransform: "uppercase",
    position: "absolute",
    fontFamily: "Matemasie",
  },
});
