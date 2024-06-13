import { View } from "react-native";
import React from "react";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useArtists } from "@/store/library";
import { defaultStyles } from "@/styles";
import { ScrollView } from "react-native-gesture-handler";
import { padding } from "@/constants/tokens";
import ArtistTracksList from "@/components/ArtistTracksList";

const ArtistDetailScreen = () => {
  const { name: artistName } = useLocalSearchParams<{ name: string }>();

  const artists = useArtists();
  const artist = artists.find((artist) => artist.name === artistName);

  if (!artist) {
    console.warn("Artist not found");
    return <Redirect href={"/(tabs)/artists"} />;
  }

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: padding.horizontal }}
      >
        <ArtistTracksList artist={artist} />
      </ScrollView>
    </View>
  );
};

export default ArtistDetailScreen;
