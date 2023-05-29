import { classNames, Mods } from "shared/lib/classNames/classNames";
import { Fragment, memo, ReactNode, useState } from "react";
import { Listbox as HListBox } from "@headlessui/react";
import { HStack } from "../Stack";
import { Button } from "../Button/Button";
import cls from "./ListBox.module.scss";

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

type DropdownDirection = "top" | "bottom";

interface ListBoxProps {
  items?: ListBoxItem[];
  value?: string;
  defaultValue?: string;
  onChange: <T extends string>(value: T) => void;
  className?: string;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

export const ListBox = memo((props: ListBoxProps) => {
  const {
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    className,
    direction = "bottom",
    label,
  } = props;

  const additionalClasses = [cls[direction]];

  return (
    <HStack gap="4">
      {label && <span>{`${label}>`}</span>}
      <HListBox
        as="div"
        disabled={readonly}
        className={classNames(cls.listBox, {}, [className])}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button disabled={readonly} className={cls.trigger}>
          <Button disabled={readonly}>{value ?? defaultValue}</Button>
        </HListBox.Button>
        <HListBox.Options
          className={classNames(cls.options, {}, additionalClasses)}
        >
          {items?.map((item) => (
            <HListBox.Option
              as={Fragment}
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(cls.option, {
                    [cls.active]: active,
                    [cls.disabled]: item.disabled,
                  })}
                >
                  {selected && "✅ "}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
});
