import { useLayoutEffect, useState } from "react";
import { SearchBarProps } from "react-native-screens";
import { colors } from "@/constants/tokens";
import { useNavigation } from "expo-router";

const defaultSearchOptions: SearchBarProps = {
  tintColor: colors.primary,
  hideWhenScrolling: true,
};

const useNavigationSearch = ({
  searchBarOptions,
}: {
  searchBarOptions?: SearchBarProps;
}) => {
  const [search, setSearch] = useState<string>("");

  const navigation = useNavigation();

  const handleChangeText: SearchBarProps["onChangeText"] = ({
    nativeEvent: { text },
  }) => {
    setSearch(text);
  };

  // inject searchbar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        ...defaultSearchOptions,
        ...searchBarOptions,
        onChangeText: handleChangeText,
      },
    });
  }, [navigation, searchBarOptions]);

  return search;
};

export default useNavigationSearch;
