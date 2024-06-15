import TrackPlayer, { useActiveTrack } from "react-native-track-player";
import { useFavorites } from "@/store/library";
import { useCallback } from "react";

const useTrackPlayerFavorite = () => {
  const activeTrack = useActiveTrack();

  const { favorites, toggleTrackFavorite } = useFavorites();
  const isFavorite =
    favorites.find((track) => track.url === activeTrack?.url)?.rating === 1;
  const toggleFavorite = useCallback(async () => {
    const id = await TrackPlayer.getActiveTrackIndex();

    if (id === null || id === undefined) return;

    // Update track player internal state
    await TrackPlayer.updateMetadataForTrack(id, {
      rating: isFavorite ? 0 : 1,
    });

    // Update local state
    if (activeTrack) {
      toggleTrackFavorite(activeTrack);
    }
  }, [activeTrack, isFavorite, toggleTrackFavorite]);

  return { isFavorite, toggleFavorite };
};

export default useTrackPlayerFavorite;
