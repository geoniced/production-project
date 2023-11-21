import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { Button } from "@/shared/ui/Button";

import { useCounterValue } from "../model/selectors/getCounterValue/getCounterValue";
import { useCounterActions } from "../model/slice/counterSlice";

export const Counter = memo(function Counter() {
  const dispatch = useDispatch();
  const counterValue = useCounterValue();
  const { t } = useTranslation();
  const { increment, decrement, add } = useCounterActions();

  const handleIncrement = () => {
    increment();
  };

  const handleDecrement = () => {
    decrement();
  };

  const handleAddFive = () => {
    add(5);
  };

  return (
    <div>
      <h1 data-testid="value-title">{counterValue}</h1>
      <Button data-testid="increment-btn" onClick={handleIncrement}>
        {t("increment")}
      </Button>
      <Button data-testid="decrement-btn" onClick={handleDecrement}>
        {t("decrement")}
      </Button>
      <Button data-testid="add-five-btn" onClick={handleAddFive}>
        {t("Add five")}
      </Button>
    </div>
  );
});
