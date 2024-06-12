import {
  View,
  Text,
  ViewProps,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import TrackPlayer, { Track } from "react-native-track-player";
import { defaultStyles } from "@/styles";
import { colors } from "@/constants/tokens";
import { Ionicons } from "@expo/vector-icons";

type QueueControlsProps = {
  tracks: Track[];
} & ViewProps;

const QueueControls = ({ tracks, style, ...viewProps }: QueueControlsProps) => {
  const handlePlayAll = async () => {
    await TrackPlayer.setQueue(tracks);
    await TrackPlayer.play();
  };
  const handleShufflePlay = async () => {
    const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5);

    await TrackPlayer.setQueue(shuffledTracks);
    await TrackPlayer.play();
  };
  return (
    <View style={[{ flexDirection: "row", columnGap: 16 }, style]}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={handlePlayAll}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Ionicons name="play" size={22} color={colors.primary} />
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={handleShufflePlay}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Ionicons name="shuffle-sharp" size={24} color={colors.primary} />
          <Text style={styles.buttonText}>Shuffle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QueueControls;

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: `rgba(47,47,47,0.5)`,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 8,
  },
  buttonText: {
    ...defaultStyles.text,
    color: colors.primary,
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
});
