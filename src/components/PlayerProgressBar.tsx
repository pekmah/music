import { View, Text, ViewProps, StyleSheet } from "react-native";
import React from "react";
import { Slider } from "react-native-awesome-slider";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { useSharedValue } from "react-native-reanimated";

import { formatSecondsToMinutes } from "@/helpers/helpers";
import { colors, fontSize } from "@/constants/tokens";
import { defaultStyles, utilStyles } from "@/styles";

const PlayerProgressBar = ({ style }: ViewProps) => {
  const { duration, position } = useProgress(250);
  const isSliding = useSharedValue(false);
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const trackElapsedTime = formatSecondsToMinutes(position);
  const trackRemainingTime = formatSecondsToMinutes(duration - position);

  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0;
  }

  return (
    <View style={style}>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        containerStyle={utilStyles.slider}
        thumbWidth={0}
        renderBubble={() => null}
        onSlidingStart={() => {
          isSliding.value = true;
        }}
        theme={{
          minimumTrackTintColor: colors.minimumTrackTintColor,
          maximumTrackTintColor: colors.maximumTrackTintColor,
        }}
        onValueChange={async (val) => {
          await TrackPlayer.seekTo(val * duration);
        }}
        onSlidingComplete={async (value) => {
          if (!isSliding.value) return;

          isSliding.value = false;
          await TrackPlayer.seekTo(value * duration);
        }}
      />

      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{trackElapsedTime}</Text>
        <Text style={styles.timeText}>
          {"-"}
          {trackRemainingTime}
        </Text>
      </View>
    </View>
  );
};

export default PlayerProgressBar;

const styles = StyleSheet.create({
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 20,
  },
  timeText: {
    ...defaultStyles.text,
    color: colors.textMuted,
    fontSize: fontSize.xs,
    opacity: 0.75,
    letterSpacing: 0.7,
    fontWeight: "500",
  },
});
