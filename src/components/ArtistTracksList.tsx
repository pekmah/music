import { View, Text, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { Artist } from "@/helpers/types";
import useNavigationSearch from "@/hooks/useNavigationSearch";
import { trackTitleFilter } from "@/helpers/filter";
import { generateTrackListId } from "@/helpers/helpers";
import FastImage from "react-native-fast-image";
import { unknownArtistImageUri } from "@/constants/images";
import { defaultStyles } from "@/styles";
import { fontSize } from "@/constants/tokens";
import TracksList from "./TracksList";
import QueueControls from "./QueueControls";

const ArtistTracksList = ({ artist }: { artist: Artist }) => {
  const search = useNavigationSearch({
    searchBarOptions: {
      hideWhenScrolling: true,
      placeholder: "Find song",
    },
  });

  const filteredArtistTracks = useMemo(() => {
    return artist.tracks.filter(trackTitleFilter(search));
  }, [artist.tracks, search]);

  return (
    <TracksList
      id={generateTrackListId(artist.name, search)}
      scrollEnabled={false}
      hideQueueControls={true}
      ListHeaderComponentStyle={styles.artistHeaderContainer}
      ListHeaderComponent={
        <View>
          <View style={styles.artworkImageContainer}>
            <FastImage
              style={styles.artistImage}
              source={{
                uri: unknownArtistImageUri,
                priority: FastImage.priority.high,
              }}
            />
          </View>

          <Text numberOfLines={1} style={styles.artistNameText}>
            {artist.name}
          </Text>
          {search.length === 0 ? (
            <QueueControls
              tracks={filteredArtistTracks}
              style={{ paddingTop: 24 }}
            />
          ) : null}
        </View>
      }
      tracks={artist.tracks}
    />
  );
};

export default ArtistTracksList;

const styles = StyleSheet.create({
  artistHeaderContainer: {
    flex: 1,
    marginBottom: 32,
  },
  artworkImageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 200,
  },
  artistImage: {
    width: "60%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 128,
  },
  artistNameText: {
    ...defaultStyles.text,
    marginTop: 22,
    textAlign: "center",
    fontSize: fontSize.lg,
    fontWeight: "800",
  },
});
