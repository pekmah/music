import { View, TouchableHighlight, StyleSheet, Text } from "react-native";
import FastImage from "react-native-fast-image";
import { Track, useActiveTrack, useIsPlaying } from "react-native-track-player";
import LoaderKit from "react-native-loader-kit";

import { unknownTrackImageUri } from "@/constants/images";
import { colors, fontSize } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { Entypo, Ionicons } from "@expo/vector-icons";

export type TrackListItemProps = {
  track: Track;
  onTrackSelect: (track: Track) => void;
};

const TrackListItem = ({
  track,
  onTrackSelect: handleTrackSelect,
}: TrackListItemProps) => {
  const { playing } = useIsPlaying();
  const isActiveTrack = useActiveTrack()?.url === track.url;

  return (
    <TouchableHighlight onPress={() => handleTrackSelect(track)}>
      <View style={styles.trackItemContainer}>
        <View>
          <FastImage
            source={{
              uri: track.artwork ?? unknownTrackImageUri,
              priority: FastImage.priority.normal,
            }}
            style={{
              ...styles.trackArtworkImage,
              opacity: isActiveTrack ? 0.6 : 1,
            }}
          />

          {isActiveTrack &&
            (playing ? (
              <LoaderKit
                style={styles.trackPlayingIconIndicator}
                name="LineScaleParty"
                color={colors.icon}
              />
            ) : (
              <Ionicons
                style={styles.trackPausedIconIndicator}
                name="play"
                size={24}
                color={colors.icon}
              />
            ))}
        </View>

        <View style={styles.trackWrapper}>
          {/* Track title + artist */}
          <View style={{ width: "100%" }}>
            <Text
              numberOfLines={1}
              style={{
                ...styles.trackTitleText,
                color: isActiveTrack ? colors.primary : colors.text,
              }}
            >
              {track.title}
            </Text>

            {track.artist ? (
              <Text style={styles.trackArtistText}>{track.artist}</Text>
            ) : (
              <></>
            )}
          </View>
          <Entypo name="dots-three-horizontal" size={18} color={colors.icon} />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default TrackListItem;

const styles = StyleSheet.create({
  trackItemContainer: {
    flexDirection: "row",
    columnGap: 14,
    alignItems: "center",
    paddingRight: 20,
  },
  trackArtworkImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  trackTitleText: {
    ...defaultStyles.text,
    fontSize: fontSize.sm,
    fontWeight: 600,
    maxWidth: "90%",
  },
  trackArtistText: {
    ...defaultStyles.text,
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
  trackWrapper: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  trackPlayingIconIndicator: {
    position: "absolute",
    top: 18,
    left: 16,
    width: 16,
    height: 16,
  },
  trackPausedIconIndicator: {
    position: "absolute",
    top: 14,
    left: 14,
  },
});
