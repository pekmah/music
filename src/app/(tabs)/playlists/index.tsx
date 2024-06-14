import { View, ScrollView } from "react-native";
import { defaultStyles } from "@/styles";
import { padding } from "@/constants/tokens";
import useNavigationSearch from "@/hooks/useNavigationSearch";
import { usePlaylists } from "@/store/library";
import { useMemo } from "react";
import { playlistNameFilter } from "@/helpers/filter";
import { Playlist } from "@/helpers/types";
import { useRouter } from "expo-router";
import PlaylistList from "@/components/PlaylistList";

const PlaylistScreen = () => {
  const router = useRouter();
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in playlists",
    },
  });
  const { playlists } = usePlaylists();
  const filteredPlaylists = useMemo(() => {
    return playlists.filter(playlistNameFilter(search));
  }, [playlists, search]);

  const handlePlayListPress = (playlist: Playlist) => {
    router.push(`/(tabs)/playlists/${playlist.name}`);
  };

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: padding.horizontal }}
      >
        <PlaylistList
          scrollEnabled={false}
          playlists={filteredPlaylists}
          onPlayListPress={handlePlayListPress}
        />
      </ScrollView>
    </View>
  );
};

export default PlaylistScreen;
