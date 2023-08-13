import { classNames } from "shared/lib/classNames/classNames";
import { Fragment, memo, ReactNode } from "react";
import { Listbox as HListBox } from "@headlessui/react";
import { DropdownDirection } from "shared/types/ui";
import { HStack } from "../../../Stack";
import { Button } from "../../../Button/Button";
import cls from "./ListBox.module.scss";
import { mapDirectionToClass } from "../../styles/consts";
import popupCls from "../../styles/popups.module.scss";

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

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

export const ListBox = memo(function ListBox(props: ListBoxProps) {
  const {
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    className,
    direction = "bottom right",
    label,
  } = props;

  const optionsClasses = mapDirectionToClass[direction];

  return (
    <HStack gap="4">
      {label && <span>{`${label}>`}</span>}
      <HListBox
        as="div"
        disabled={readonly}
        className={classNames(popupCls.popup, {}, [className])}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button disabled={readonly} className={cls.trigger}>
          <Button disabled={readonly}>{value ?? defaultValue}</Button>
        </HListBox.Button>
        <HListBox.Options
          className={classNames(cls.options, {}, [optionsClasses])}
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
                    [popupCls.active]: active,
                    [popupCls.disabled]: item.disabled,
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
