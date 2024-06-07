import { View, ScrollView } from "react-native";
import { defaultStyles } from "@/styles";
import TracksList from "@/components/TracksList";
import { padding } from "@/constants/tokens";
import useNavigationSearch from "@/hooks/useNavigationSearch";
import library from "@/assets/data/library.json";
import { useMemo } from "react";
import { trackTitleFilter } from "@/helpers/filter";

const SongsScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in songs",
    },
  });

  const filteredSongs = useMemo(() => {
    if (!search) return library;

    return library.filter(trackTitleFilter(search));
  }, [search]);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          paddingHorizontal: padding.horizontal,
        }}
      >
        <TracksList tracks={filteredSongs} scrollEnabled={false} />
      </ScrollView>
    </View>
  );
};

export default SongsScreen;
