import React, { FC, memo, useMemo } from "react";
import {
  ImageBackground,
  ImageProps,
  StyleProp,
  StyleSheet,
  Text,
  useWindowDimensions,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Card } from "../types/Card";

type ItemProps = Pick<ViewProps, "style"> & {
  card: Card;
};

const CardItem: FC<ItemProps> = ({ card: { title, photo }, style }) => {
  const { width: screenWidth } = useWindowDimensions();

  const containerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [styles.container, { width: screenWidth - 16 * 2 }, style],
    [screenWidth, style]
  );

  const source = useMemo<ImageProps["source"]>(() => ({ uri: photo }), [photo]);

  return (
    <ImageBackground style={containerStyle} source={source}>
      <Text style={styles.title}>{title}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 6,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    aspectRatio: 1,
    justifyContent: "flex-end",
    padding: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "white",
  },
  title: {
    fontSize: 32,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { height: 1, width: 0 },
    textShadowRadius: 1,
  },
});

export default memo(CardItem);
