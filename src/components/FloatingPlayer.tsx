import React from "react";
import { useActiveTrack } from "react-native-track-player";
import FastImage from "react-native-fast-image";
import { unknownTrackImageUri } from "@/constants/images";
import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import { defaultStyles } from "@/styles";
import { PlayPauseButton, SkipToNextButton } from "./PlayerControls";
import useLastActiveTrack from "@/hooks/useLastActiveTrack";
import MovingText from "./MovingText";
import { useRouter } from "expo-router";

const FloatingPlayer = ({ style }: ViewProps) => {
  const router = useRouter();
  const activeTrack = useActiveTrack();
  const lastActiveTrack = useLastActiveTrack();

  const displayedTrack = activeTrack ?? lastActiveTrack;

  const handleViewTrack = () => {
    router.navigate("/player");
  };

  if (!displayedTrack) return null;

  return (
    <TouchableOpacity
      onPress={handleViewTrack}
      activeOpacity={0.9}
      style={[styles.container, style]}
    >
      <>
        <FastImage
          source={{ uri: displayedTrack.artwork ?? unknownTrackImageUri }}
          style={styles.trackArtworkImage}
        />

        {/* Title */}
        <View style={styles.trackTitleContainer}>
          <MovingText
            text={displayedTrack?.title ?? ""}
            style={styles.trackTitle}
            animationThreshold={25}
          />
        </View>

        {/* Actions button  */}
        <View style={styles.trackControlsContainer}>
          {/* <SkipToPrevButton iconSize={22} /> */}
          <PlayPauseButton iconSize={24} />
          <SkipToNextButton iconSize={22} />
        </View>
      </>
    </TouchableOpacity>
  );
};

export default FloatingPlayer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252525",
    padding: 8,
    borderRadius: 12,
    paddingVertical: 10,
  },
  trackArtworkImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  trackTitle: {
    ...defaultStyles.text,
    fontSize: 18,
    fontWeight: "600",
    paddingLeft: 10,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
    marginLeft: 10,
  },
  trackControlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
});
