import { View, Text } from "react-native";
import React, { PropsWithChildren } from "react";
import TrackPlayer, { Track } from "react-native-track-player";
import { MenuView } from "@react-native-menu/menu";
import { match } from "ts-pattern";
import { useFavorites } from "@/store/library";
import { useQueue } from "@/store/queue";
import { useRouter } from "expo-router";

type TrackShortcutsMenuProps = PropsWithChildren<{ track: Track }>;

const TrackShortcutsMenu = ({ track, children }: TrackShortcutsMenuProps) => {
  const router = useRouter();
  const isFavorite = track.rating === 1;
  const { toggleTrackFavorite } = useFavorites();
  const { activateQueueId } = useQueue();

  const handlePressAction = (id: string) => {
    match(id)
      .with("add-to-favorites", async () => {
        toggleTrackFavorite(track);

        //if the track is not in the favorites, add it to the favorites
        if (activateQueueId?.startsWith("favorites")) {
          await TrackPlayer.add(track);
        }
      })
      .with("remove-from-favorites", async () => {
        toggleTrackFavorite(track);

        //if the track is not in the favorites, add it to the favorites
        if (activateQueueId?.startsWith("favorites")) {
          const queue = await TrackPlayer.getQueue();
          const trackToRemove = queue.findIndex(
            (queueTrack) => queueTrack.url === track.url
          );
          await TrackPlayer.remove(trackToRemove);
        }
      })
      .with("add-to-playlist", async () => {
        router.push({
          pathname: "(modals)/addToPlaylist",
          params: { trackUrl: track.url },
        });
      })
      //Fallback
      .otherwise(() => {
        console.warn("Option not found");
      });
  };
  return (
    <MenuView
      onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
      actions={[
        {
          id: isFavorite ? "remove-from-favorites" : "add-to-favorites",
          title: isFavorite ? "Remove from favorites" : "Add to favorites",
          image: isFavorite ? "star.fill" : "star",
        },
        {
          id: "add-to-playlist",
          title: "Add to playlist",
          image: "plus",
        },
      ]}
    >
      {children}
    </MenuView>
  );
};

export default TrackShortcutsMenu;
