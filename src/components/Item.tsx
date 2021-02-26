import React, { FC, memo } from "react";
import {
  ImageBackground,
  ViewProps,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export type ItemType = {
  photo: string;
  title: string;
};

type ItemProps = Pick<ViewProps, "style"> & {
  item: ItemType;
};

const Item: FC<ItemProps> = ({ item: { title, photo }, style }) => {
  const window = useWindowDimensions();

  const width = window.width - 16 * 2;

  return (
    <View
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
      }}
    >
      <ImageBackground
        style={{
          width,
          height: width,
          justifyContent: "flex-end",
          padding: 16,
          borderRadius: 16,
          overflow: "hidden",
          backgroundColor: "red",
        }}
        source={{ uri: photo }}
      >
        <Text
          style={{
            fontSize: 32,
            color: "white",
            textShadowColor: "black",
            textShadowOffset: { height: 1, width: 0 },
            textShadowRadius: 1,
          }}
        >
          {title}
        </Text>
      </ImageBackground>
    </View>
  );
};

export default memo(Item);
