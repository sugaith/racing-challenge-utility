import { StyleSheet } from "react-native";

const homeScreenStyle = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "stretch",
    padding: 12,
  },
});

const racerItemStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "green",
    padding: 3,
  },

  racerInfo: {
    flex: 1,
  },
  racerResult: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { homeScreenStyle, racerItemStyle };
