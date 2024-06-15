import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import PlaylistList from "@/components/PlaylistList";
import { usePlaylists, useTracks } from "@/store/library";
import { useLocalSearchParams, useRouter } from "expo-router";
import TrackPlayer, { Track } from "react-native-track-player";
import { useQueue } from "@/store/queue";
import { Playlist } from "@/helpers/types";
import { useHeaderHeight } from "@react-navigation/elements";
import { defaultStyles } from "@/styles";
import { padding } from "@/constants/tokens";

const AddToPlaylist = () => {
  const headerHeight = useHeaderHeight();
  const router = useRouter();
  const { trackUrl } = useLocalSearchParams<{ trackUrl: Track["url"] }>();
  const tracks = useTracks();
  const { playlists, addToPlaylist } = usePlaylists();
  const track = tracks.find((track) => track.url === trackUrl);
  const { activateQueueId } = useQueue();

  //   Track not found
  if (!track) return null;

  const availablePlaylists = playlists.filter(
    (playlist) =>
      !playlist.tracks.some((playlistTrack) => playlistTrack.url === trackUrl)
  );

  const handlePlaylistPress = async (playlist: Playlist) => {
    addToPlaylist(track, playlist.name);
    router.dismiss();
    if (activateQueueId?.startsWith(playlist.name)) {
      await TrackPlayer.add(track);
    }
  };

  return (
    <SafeAreaView style={[styles.modalContainer, { paddingTop: headerHeight }]}>
      <PlaylistList
        playlists={availablePlaylists}
        onPlayListPress={handlePlaylistPress}
      />
    </SafeAreaView>
  );
};

export default AddToPlaylist;

const styles = StyleSheet.create({
  modalContainer: {
    ...defaultStyles.container,
    paddingHorizontal: padding.horizontal,
  },
});
