import { useEffect, useRef } from "react";
import TrackPlayer, { RepeatMode } from "react-native-track-player";

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 10,
  });

  await TrackPlayer.setVolume(0.4);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    setupPlayer()
      .then(() => {
        isInitialized.current = true;
        onLoad?.();
      })
      .catch((err) => {
        isInitialized.current = false;
        console.error(err);
      });
  }, [onLoad]);
};

export default useSetupTrackPlayer;
