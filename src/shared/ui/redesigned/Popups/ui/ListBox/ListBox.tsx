import { Fragment, ReactNode, useMemo } from 'react';
import { Listbox as HListBox } from '@headlessui/react';

import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

import { HStack } from '../../../../redesigned/Stack';
import { Button } from '../../../Button/Button';
import { Icon } from '../../../Icon';
import { typedMemo } from '../../../TypedMemo';
import { mapDirectionToClass } from '../../styles/consts';
import popupCls from '../../styles/popups.module.scss';
import cls from './ListBox.module.scss';

export interface ListBoxItem<T extends string> {
  value: T;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  items?: ListBoxItem<T>[];
  value?: T;
  defaultValue?: string;
  onChange: (value: T) => void;
  className?: string;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}
export const ListBox = typedMemo(function ListBox<T extends string>(
  props: ListBoxProps<T>,
) {
  const {
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    className,
    direction = 'bottom right',
    label,
  } = props;

  const optionsClasses = [mapDirectionToClass[direction], popupCls.menu];

  const selectedItem = useMemo(() => {
    return items?.find((item) => item.value === value);
  }, [items, value]);

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
        <HListBox.Button className={cls.trigger}>
          <Button
            variant="filled"
            disabled={readonly}
            addonRight={<Icon Svg={ArrowIcon} />}
          >
            {selectedItem?.content ?? defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options
          className={classNames(cls.options, {}, optionsClasses)}
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
                    [cls.selected]: selected,
                  })}
                >
                  {selected && '✅ '}
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
