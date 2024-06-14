import { View, StyleSheet, Text } from "react-native";
import React, { useMemo } from "react";
import FastImage from "react-native-fast-image";

import TracksList from "./TracksList";
import useNavigationSearch from "@/hooks/useNavigationSearch";
import { Playlist } from "@/helpers/types";
import { trackTitleFilter } from "@/helpers/filter";
import { generateTrackListId } from "@/helpers/helpers";
import { defaultStyles } from "@/styles";
import { fontSize } from "@/constants/tokens";
import QueueControls from "./QueueControls";

const PlayListTracksList = ({ playlist }: { playlist: Playlist }) => {
  const search = useNavigationSearch({
    searchBarOptions: {
      hideWhenScrolling: true,
      placeholder: "Find in playlist",
    },
  });

  const filteredPlaylistTracks = useMemo(() => {
    return playlist.tracks.filter(trackTitleFilter(search));
  }, [playlist.tracks, search]);
  return (
    <TracksList
      id={generateTrackListId(playlist.name, search)}
      scrollEnabled={false}
      hideQueueControls={true}
      tracks={filteredPlaylistTracks}
      ListHeaderComponentStyle={styles.playlistHeaderContainer}
      ListHeaderComponent={
        <View>
          <View style={styles.artworkImageContainer}>
            <FastImage
              style={styles.artworkImage}
              source={{
                uri: playlist.artworkPreview,
                priority: FastImage.priority.high,
              }}
            />
          </View>

          <Text numberOfLines={1} style={styles.playlistNameText}>
            {playlist.name}
          </Text>

          {search.length === 0 && (
            <QueueControls
              style={{ paddingTop: 24 }}
              tracks={playlist.tracks}
            />
          )}
        </View>
      }
    />
  );
};

export default PlayListTracksList;

const styles = StyleSheet.create({
  playlistHeaderContainer: {
    flex: 1,
    marginBottom: 32,
  },
  artworkImageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 300,
  },
  artworkImage: {
    width: "85%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,
  },

  playlistNameText: {
    ...defaultStyles.text,
    marginTop: 22,
    textAlign: "center",
    fontSize: fontSize.lg,
    fontWeight: "800",
  },
});
