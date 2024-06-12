import { View, ScrollView } from "react-native";
import { defaultStyles } from "@/styles";
import TracksList from "@/components/TracksList";
import { padding } from "@/constants/tokens";
import useNavigationSearch from "@/hooks/useNavigationSearch";
import { useMemo } from "react";
import { trackTitleFilter } from "@/helpers/filter";
import { useTracks } from "@/store/library";
import { generateTrackListId } from "@/helpers/helpers";

const SongsScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in songs",
    },
  });

  const tracks = useTracks();

  const filteredSongs = useMemo(() => {
    if (!search) return tracks;

    return tracks.filter(trackTitleFilter(search));
  }, [search, tracks]);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          paddingHorizontal: padding.horizontal,
        }}
      >
        <TracksList
          id={generateTrackListId("songs", search)}
          tracks={filteredSongs}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default SongsScreen;
