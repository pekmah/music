import { View, ScrollView } from "react-native";
import React from "react";
import { Redirect, useLocalSearchParams } from "expo-router";
import { usePlaylists } from "@/store/library";
import { padding } from "@/constants/tokens";
import PlayListTracksList from "@/components/PlayListTracksList";
import { defaultStyles } from "@/styles";

const PlayList = () => {
  const { name: playListName } = useLocalSearchParams<{ name: string }>();

  const { playlists } = usePlaylists();
  const playList = playlists.find((playlist) => playlist.name === playListName);

  if (!playList) {
    console.warn(`Playlist with name ${playListName} not found`);
    return <Redirect href={`/(tabs)/playlists`} />;
  }
  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: padding.horizontal }}
      >
        <PlayListTracksList playlist={playList} />
      </ScrollView>
    </View>
  );
};

export default PlayList;
