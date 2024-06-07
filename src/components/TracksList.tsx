import { View, FlatList, FlatListProps } from "react-native";

import TrackListItem from "./TrackListItem";
import { utilStyles } from "@/styles";

export type TrackListProps = Partial<FlatListProps<unknown>> & {
  tracks: any[];
};

const TracksList = ({ tracks, ...flatlistProps }: TrackListProps) => {
  return (
    <FlatList
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      data={tracks}
      ItemSeparatorComponent={ItemSeperator}
      renderItem={({ item: track }) => (
        <TrackListItem
          track={{
            ...track,
            image: track.artwork,
          }}
        />
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
