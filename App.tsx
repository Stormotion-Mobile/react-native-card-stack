import React, { useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Item, { ItemType } from "./src/components/Item";

const ROTATION_ANGLE = 20;
const SWIPE_VELOCITY = 800;

const items: ItemType[] = [
  { title: "Doggo 1", photo: "https://picsum.photos/id/237/500/500" },
  { title: "Doggo 2", photo: "https://picsum.photos/id/237/500/500" },
  { title: "Doggo 3", photo: "https://picsum.photos/id/237/500/500" },
  { title: "Doggo 4", photo: "https://picsum.photos/id/237/500/500" },
  { title: "Doggo 5", photo: "https://picsum.photos/id/237/500/500" },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextIndex = currentIndex + 1;

  const currentItem = items[currentIndex];
  const nextItem = items[nextIndex];

  const translateX = useSharedValue(0);

  const window = useWindowDimensions();

  const hiddenTranslateX = 2 * window.width;

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number }
  >({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
    onEnd: (event) => {
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
        translateX.value = withSpring(0);

        return;
      }

      translateX.value = withSpring(hiddenTranslateX, {}, () =>
        runOnJS(setCurrentIndex)(currentIndex + 1)
      );
    },
  });

  const rotate = useDerivedValue(
    () =>
      interpolate(
        translateX.value,
        [0, hiddenTranslateX],
        [0, ROTATION_ANGLE]
      ) + "deg"
  );

  const currentItemAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      {
        rotate: rotate.value,
      },
    ],
  }));

  const nextItemAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-hiddenTranslateX, 0, hiddenTranslateX],
          [1, 0.8, 1]
        ),
      },
    ],
    opacity: interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.6, 1]
    ),
  }));

  useEffect(() => {
    translateX.value = 0;
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <View
        style={[
          StyleSheet.absoluteFill,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        {nextItem && (
          <Animated.View style={nextItemAnimatedStyle}>
            <Item item={nextItem} />
          </Animated.View>
        )}
      </View>
      {currentItem && (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={currentItemAnimatedStyle}>
            <Item item={currentItem} />
          </Animated.View>
        </PanGestureHandler>
      )}
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
