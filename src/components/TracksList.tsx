import { View, FlatList, FlatListProps, Text } from "react-native";

import TrackListItem from "./TrackListItem";
import { utilStyles } from "@/styles";
import TrackPlayer, { Track } from "react-native-track-player";
import { unknownTrackImageUri } from "@/constants/images";
import FastImage from "react-native-fast-image";

export type TrackListProps = Partial<FlatListProps<Track>> & {
  tracks: Track[];
};

const TracksList = ({ tracks, ...flatlistProps }: TrackListProps) => {
  const handleTrackSelect = async (track: Track) => {
    await TrackPlayer.load(track);
    await TrackPlayer.play();
  };

  return (
    <FlatList
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      data={tracks}
      ItemSeparatorComponent={ItemSeperator}
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
      renderItem={({ item: track }) => (
        <TrackListItem track={track} onTrackSelect={handleTrackSelect} />
      )}
      {...flatlistProps}
    />
  );
};

export default TracksList;

const ItemSeperator = () => (
  <View
    style={{ ...utilStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }}
  />
);
