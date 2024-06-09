import React, { useEffect } from "react";
import { Track, useActiveTrack } from "react-native-track-player";

const useLastActiveTrack = () => {
  const activeTrack = useActiveTrack();
  const [lastActiveTrack, setLastActiveTrack] = React.useState<Track>();

  useEffect(() => {
    if (!activeTrack) return;
    setLastActiveTrack(activeTrack);

    // return () => {
    //   setLastActiveTrack(undefined);
    // };
  }, [activeTrack]);

  return lastActiveTrack;
};

export default useLastActiveTrack;
