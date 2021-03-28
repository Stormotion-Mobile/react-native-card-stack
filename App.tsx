import React, { FC, useCallback } from "react";
import CardItem from "./src/components/CardItem";
import Stack, { StackProps } from "./src/components/Stack";
import { cards } from "./src/mocks/cards";
import { Card } from "./src/types/Card";

const App: FC = () => {
  const renderItem = useCallback((item) => <CardItem card={item} />, []);

  const handleSwipeLeft = useCallback<
    NonNullable<StackProps<Card>["onSwipeLeft"]>
  >((item) => {}, []);

  const handleSwipeRight = useCallback<
    NonNullable<StackProps<Card>["onSwipeLeft"]>
  >((item) => {}, []);

  return (
    <Stack
      data={cards}
      renderItem={renderItem}
      onSwipeLeft={handleSwipeLeft}
      onSwipeRight={handleSwipeRight}
    />
  );
};

export default App;
