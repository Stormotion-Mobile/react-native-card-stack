import React from "react";
import { StyleSheet, View } from "react-native";
import Item, { ItemType } from "./src/components/Item";

const items: ItemType[] = [
  { title: "Doggo", photo: "https://picsum.photos/id/237/500/500" },
];

export default function App() {
  return (
    <View style={styles.container}>
      <Item item={items[0]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
