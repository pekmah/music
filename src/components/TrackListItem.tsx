import { unknownTrackImageUri } from "@/constants/images";
import { colors, fontSize } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { View, TouchableHighlight, StyleSheet, Text } from "react-native";
import FastImage from "react-native-fast-image";

export type TrackListItemProps = {
  track: { title: string; image?: string; artist?: string };
};

const TrackListItem = ({ track }: TrackListItemProps) => {
  const isActiveTrack = false;

  return (
    <TouchableHighlight>
      <View style={styles.trackItemContainer}>
        <View>
          <FastImage
            source={{
              uri: track.image ?? unknownTrackImageUri,
              priority: FastImage.priority.normal,
            }}
            style={{
              ...styles.trackArtworkImage,
              opacity: isActiveTrack ? 0.6 : 1,
            }}
          />
        </View>

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
          {track.artist && (
            <Text style={styles.trackArtistText}>{track.artist}</Text>
          )}
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
});
