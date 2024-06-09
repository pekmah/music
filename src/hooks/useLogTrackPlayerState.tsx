import { Event, useTrackPlayerEvents } from "react-native-track-player";

const events = [
  Event.PlaybackState,
  Event.PlaybackError,
  Event.PlaybackActiveTrackChanged,
];

const useLogTrackPlayerState = () => {
  useTrackPlayerEvents(events, async (event) => {
    if (event.type === Event.PlaybackError) {
      console.warn("An error occured", event);
    }
    if (event.type === Event.PlaybackState) {
      // console.warn("Playback State: ", event.state);
    }
    if (event.type === Event.PlaybackActiveTrackChanged) {
      // console.warn("Track Changed: ", event.index);
    }
  });
};

export default useLogTrackPlayerState;
