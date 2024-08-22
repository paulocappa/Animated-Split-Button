import { StyleSheet, View } from "react-native";
import { Pallete } from "@/constants/palette";
import { SplitButton } from "@/components/split-button";
import { useState } from "react";

export default function Index() {
  const [splitted, setSplitted] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <SplitButton
        splitted={splitted}
        mainAction={{
          label: "Stop",
          onPress: () => {
            console.log("stop");
            setSplitted(true);
          },
          backgroundColor: Pallete.card,
        }}
        leftAction={{
          label: "Resume",
          onPress: () => {
            console.log("Resume");
            setSplitted(false);
          },
          backgroundColor: Pallete.card,
        }}
        rightAction={{
          label: "Finish",
          onPress: () => {
            console.log("Finish");
          },
          backgroundColor: Pallete.highlight,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Pallete.background,
  },
});
