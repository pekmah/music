import { View, Text, FlatListProps, FlatList } from "react-native";
import React, { useMemo } from "react";
import { Playlist } from "@/helpers/types";
import useNavigationSearch from "@/hooks/useNavigationSearch";
import { playlistNameFilter } from "@/helpers/filter";
import { utilStyles } from "@/styles";
import FastImage from "react-native-fast-image";
import { unknownTrackImageUri } from "@/constants/images";
import PlayListListItem from "./PlayListListItem";

type playlistListProps = {
  playlists: Playlist[];
  onPlayListPress: (playlist: Playlist) => void;
} & Partial<FlatListProps<Playlist>>;

const PlaylistList = ({
  playlists,
  onPlayListPress,
  ...flatListProps
}: playlistListProps) => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in playlist",
    },
  });
  const filteredPlaylists = useMemo(() => {
    return playlists.filter(playlistNameFilter(search));
  }, [playlists, search]);

  const handlePlayListPress = (playlist: Playlist) => {
    onPlayListPress(playlist);
  };

  return (
    <FlatList
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      ItemSeparatorComponent={ItemSeperator}
      data={filteredPlaylists}
      ListEmptyComponent={
        <View>
          <Text style={utilStyles.emptyContentText}>No songs found</Text>
          <FastImage
            source={{
              uri: unknownTrackImageUri,
              priority: FastImage.priority.normal,
            }}
            style={utilStyles.emptyContentImage}
          />
        </View>
      }
      renderItem={({ item: playlist }) => (
        <PlayListListItem
          playlist={playlist}
          onPress={() => handlePlayListPress(playlist)}
        />
      )}
      {...flatListProps}
    />
  );
};

export default PlaylistList;

const ItemSeperator = () => (
  <View
    style={{ ...utilStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }}
  />
);
