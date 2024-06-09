import { StyleSheet } from "react-native";

import { colors, fontSize } from "@/constants/tokens";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {
    fontSize: fontSize.base,
    color: colors.text,
  },
});

export const utilStyles = StyleSheet.create({
  itemSeparator: {
    borderColor: colors.textMuted,
    borderWidth: StyleSheet.hairlineWidth,
    opacity: 0.3,
  },
  emptyContentText: {
    ...defaultStyles.text,
    textAlign: "center",
    marginTop: 20,
    color: colors.textMuted,
  },
  emptyContentImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 40,
    opacity: 0.3,
  },
});
