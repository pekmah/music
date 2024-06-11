import { View, ViewProps } from "react-native";
import React from "react";
import { useSharedValue } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/tokens";
import { Slider } from "react-native-awesome-slider";
import { utilStyles } from "@/styles";
import useTrackPlayerVolume from "@/hooks/useTrackPlayerVolume";

const PlayerVolumeBar = ({ style }: ViewProps) => {
  const { volume, updateVolume } = useTrackPlayerVolume();

  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  progress.value = volume ?? 0;

  return (
    <View style={style}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name="volume-low"
          size={20}
          color={colors.icon}
          style={{ opacity: 0.8 }}
        />

        <View style={{ flex: 1, paddingHorizontal: 10, flexDirection: "row" }}>
          <Slider
            progress={progress}
            minimumValue={min}
            maximumValue={max}
            containerStyle={utilStyles.slider}
            thumbWidth={0}
            renderBubble={() => null}
            theme={{
              minimumTrackTintColor: colors.minimumTrackTintColor,
              maximumTrackTintColor: colors.maximumTrackTintColor,
            }}
            onValueChange={(val) => updateVolume(val)}
          />
        </View>

        <Ionicons
          name="volume-high"
          size={20}
          color={colors.icon}
          style={{ opacity: 0.8 }}
        />
      </View>
    </View>
  );
};

export default PlayerVolumeBar;
