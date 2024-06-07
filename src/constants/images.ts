import { Image } from "react-native";

import unknownArtistImage from "@/assets/images/unknown_artist.png";
import unknownTrackImage from "@/assets/images/unknown_track.png";

export const unknownArtistImageUri =
  Image.resolveAssetSource(unknownArtistImage).uri;
export const unknownTrackImageUri =
  Image.resolveAssetSource(unknownTrackImage).uri;
