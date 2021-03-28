import React, { FC, useEffect, useState } from "react";
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
import CardItem from "./src/components/CardItem";
import { cards } from "./src/mocks/cards";

const ROTATION_ANGLE = 60;
const SWIPE_VELOCITY = 800;

const App: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextIndex = currentIndex + 1;

  const currentItem = cards[currentIndex];
  const nextItem = cards[nextIndex];

  const translateX = useSharedValue(0);

  const { width: screenWidth } = useWindowDimensions();

  const hiddenTranslateX = 2 * screenWidth;

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

      translateX.value = withSpring(
        Math.sign(event.velocityX) * hiddenTranslateX,
        {},
        () => runOnJS(setCurrentIndex)(currentIndex + 1)
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
      <View style={styles.nextItemContainer}>
        {nextItem && (
          <Animated.View style={nextItemAnimatedStyle}>
            <CardItem card={nextItem} />
          </Animated.View>
        )}
      </View>
      {currentItem && (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={currentItemAnimatedStyle}>
            <CardItem card={currentItem} />
          </Animated.View>
        </PanGestureHandler>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  nextItemContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
