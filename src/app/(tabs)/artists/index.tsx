import { View, ScrollView, FlatList, Text, StyleSheet } from "react-native";
import { defaultStyles, utilStyles } from "@/styles";
import { useArtists } from "@/store/library";
import useNavigationSearch from "@/hooks/useNavigationSearch";
import { useMemo } from "react";
import { artistNameFilter } from "@/helpers/filter";
import { padding } from "@/constants/tokens";
import FastImage from "react-native-fast-image";
import { unknownArtistImageUri } from "@/constants/images";
import { Link } from "expo-router";
import { TouchableHighlight } from "react-native-gesture-handler";

const ArtistsScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find artist",
    },
  });
  const artists = useArtists();

  const filteredArtists = useMemo(() => {
    if (!search) return artists;

    return artists.filter(artistNameFilter(search));
  }, [artists, search]);
  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: padding.horizontal }}
      >
        {/* Artist list */}
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
          data={filteredArtists}
          renderItem={({ item: artist }) => {
            return (
              <Link href={`/artists/${artist.name}`} asChild>
                <TouchableHighlight activeOpacity={0.8}>
                  <View style={styles.artistItemContainer}>
                    <View>
                      <FastImage
                        style={styles.artistImage}
                        source={{
                          uri: unknownArtistImageUri,
                          priority: FastImage.priority.normal,
                        }}
                      />
                    </View>

                    <View style={{ width: "100%" }}>
                      <Text numberOfLines={1} style={styles.artistNameText}>
                        {artist.name}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </Link>
            );
          }}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={
            <View>
              <Text style={defaultStyles.text}>No artists found</Text>
              <FastImage
                style={utilStyles.emptyContentImage}
                source={{
                  uri: unknownArtistImageUri,
                  priority: FastImage.priority.normal,
                }}
              />
            </View>
          }
        />
      </ScrollView>
    </View>
  );
};

export default ArtistsScreen;

const ItemSeparatorComponent = () => (
  <View
    style={[utilStyles.itemSeparator, { marginLeft: 50, marginVertical: 12 }]}
  />
);

const styles = StyleSheet.create({
  artistItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 14,
  },
  artistImage: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  artistNameText: {
    ...defaultStyles.text,
    fontSize: 17,
    maxWidth: "80%",
  },
});
