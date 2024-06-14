import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import React from "react";
import { Playlist } from "@/helpers/types";
import { TouchableHighlightProps } from "react-native-gesture-handler";
import { defaultStyles } from "@/styles";
import FastImage from "react-native-fast-image";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "@/constants/tokens";

type PlayListListItemProps = {
  playlist: Playlist;
} & TouchableHighlightProps;

const PlayListListItem = ({ playlist, ...props }: PlayListListItemProps) => {
  return (
    <TouchableHighlight activeOpacity={0.8} {...props}>
      <View style={sytles.playlistItemContainer}>
        <FastImage
          style={sytles.playlistArtworkImage}
          source={{
            uri: playlist.artworkPreview,
            priority: FastImage.priority.normal,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text numberOfLines={1} style={sytles.playlistNameText}>
            {playlist.name}
          </Text>

          <AntDesign
            name="right"
            size={16}
            color={colors.icon}
            style={{ opacity: 0.5 }}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default PlayListListItem;

const sytles = StyleSheet.create({
  playlistItemContainer: {
    flexDirection: "row",
    columnGap: 14,
    alignItems: "center",
    paddingRight: 90,
  },
  playlistArtworkImage: {
    borderRadius: 8,
    width: 70,
    height: 70,
  },
  playlistNameText: {
    ...defaultStyles.text,
    fontSize: 17,
    fontWeight: "600",
    maxWidth: "80%",
  },
});
