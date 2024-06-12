import { View, FlatList, FlatListProps, Text } from "react-native";

import TrackListItem from "./TrackListItem";
import { utilStyles } from "@/styles";
import TrackPlayer, { Track } from "react-native-track-player";
import { unknownTrackImageUri } from "@/constants/images";
import FastImage from "react-native-fast-image";
import { useQueue } from "@/store/queue";
import { useRef } from "react";

export type TrackListProps = Partial<FlatListProps<Track>> & {
  id: string;
  tracks: Track[];
};

const TracksList = ({ id, tracks, ...flatlistProps }: TrackListProps) => {
  const queueOffset = useRef(0); //save current index of played track
  const { activateQueueId, setActiveQueueId } = useQueue();

  const handleTrackSelect = async (selectedTrack: Track) => {
    // identify the track index of selected song
    const trackIndex = tracks.findIndex(
      (track) => track.url === selectedTrack.url
    );

    if (trackIndex === -1) return;

    const isChanging = id !== activateQueueId;

    if (isChanging) {
      const beforeTracks = tracks.slice(0, trackIndex);
      const afterTracks = tracks.slice(trackIndex + 1);

      await TrackPlayer.reset();

      // construct new queue
      await TrackPlayer.add(selectedTrack);
      await TrackPlayer.add(afterTracks);
      await TrackPlayer.add(beforeTracks);

      await TrackPlayer.play();

      queueOffset.current = trackIndex;
      setActiveQueueId(id);
    } else {
      const nextTrackIndex =
        trackIndex - queueOffset.current < 0
          ? tracks.length + trackIndex - queueOffset.current
          : trackIndex - queueOffset.current;

      await TrackPlayer.skip(nextTrackIndex);
      TrackPlayer.play();
    }
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
