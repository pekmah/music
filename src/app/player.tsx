// stack screen
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import { defaultStyles, utilStyles } from "@/styles";
import { colors, fontSize, padding } from "@/constants/tokens";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useActiveTrack } from "react-native-track-player";
import FastImage from "react-native-fast-image";
import { unknownTrackImageUri } from "@/constants/images";
import MovingText from "@/components/MovingText";
import { FontAwesome } from "@expo/vector-icons";
import { PlayerControls } from "@/components/PlayerControls";
import PlayerVolumeBar from "@/components/PlayerVolumeBar";
import PlayerProgressBar from "@/components/PlayerProgressBar";
import PlayerRepeatToggle from "@/components/PlayerRepeatToggle";
import usePlayerBackground from "@/hooks/usePlayerBackground";
import { LinearGradient } from "expo-linear-gradient";

const Player = () => {
  const activeTrack = useActiveTrack();
  const { top, bottom } = useSafeAreaInsets();
  const { imageColors } = usePlayerBackground(
    activeTrack?.artwork ?? unknownTrackImageUri
  );

  const isFavorite = false;

  const toggleFavorite = () => {
    console.log("toggleFavorite");
  };

  if (!activeTrack) {
    return (
      <View style={[defaultStyles.container, { justifyContent: "center" }]}>
        <ActivityIndicator color={colors.icon} />
      </View>
    );
  }
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={
        imageColors
          ? [imageColors.background, imageColors.primary]
          : [colors.background]
      }
    >
      <View style={styles.overlayContainer}>
        <DismissPlayerSymbol />

        <View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom }}>
          <View style={styles.artworkImageContainer}>
            <FastImage
              source={{
                uri: activeTrack.artwork ?? unknownTrackImageUri,
                priority: FastImage.priority.high,
              }}
              resizeMode="cover"
              style={styles.artworkImage}
            />
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ marginTop: "auto" }}>
              <View style={{ height: 60 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.trackTitleContainer}>
                    <MovingText
                      text={activeTrack.title ?? ""}
                      animationThreshold={30}
                      style={styles.trackTitle}
                    />
                  </View>

                  <FontAwesome
                    name={isFavorite ? "heart" : "heart-o"}
                    size={20}
                    color={isFavorite ? colors.primary : colors.icon}
                    style={{ marginHorizontal: 14 }}
                    onPress={toggleFavorite}
                  />
                </View>

                {/* Track artist */}
                {activeTrack.artist && (
                  <Text
                    numberOfLines={1}
                    style={[styles.trackArtistText, { marginTop: 6 }]}
                  >
                    {activeTrack.artist}
                  </Text>
                )}
              </View>

              <PlayerProgressBar style={{ marginTop: 32 }} />
              <PlayerControls style={{ marginTop: 40 }} />
            </View>

            <PlayerVolumeBar style={{ marginTop: "auto", marginBottom: 30 }} />

            <View style={utilStyles.centeredRow}>
              <PlayerRepeatToggle size={30} style={{ marginBottom: 6 }} />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const DismissPlayerSymbol = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.dismissPlayerSymbol, { top: top + 8 }]}>
      <View accessible={false} style={styles.dismissPlayerInnerWrapper} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...defaultStyles.container,
    paddingHorizontal: padding.horizontal,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dismissPlayerSymbol: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
  },
  dismissPlayerInnerWrapper: {
    width: 50,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    opacity: 0.7,
  },

  artworkImageContainer: {
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 11.0,
    flexDirection: "row",
    height: "45%",
    justifyContent: "center",
  },
  artworkImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,
  },

  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
  },
  trackTitle: {
    ...defaultStyles.text,
    fontSize: 22,
    fontWeight: "700",
  },
  trackArtistText: {
    ...defaultStyles.text,
    fontSize: fontSize.base,
    opacity: 0.8,
    maxWidth: "90%",
  },
});

export default Player;
