import { classNames } from "shared/lib/classNames/classNames";
import { Fragment, memo, ReactNode } from "react";
import { Menu } from "@headlessui/react";
import { DropdownDirection } from "shared/types/ui";
import { AppLink } from "../AppLink/AppLink";
import cls from "./Dropdown.module.scss";

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger: ReactNode;
  direction?: DropdownDirection;
}

const mapDirectionToClass: Record<DropdownDirection, string> = {
  "bottom left": cls.optionsBottomLeft,
  "bottom right": cls.optionsBottomRight,
  "top left": cls.optionsTopLeft,
  "top right": cls.optionsTopRight,
};

export const Dropdown = memo((props: DropdownProps) => {
  const { className, trigger, items, direction = "bottom left" } = props;

  const menuClasses = mapDirectionToClass[direction];

  return (
    <Menu as="div" className={classNames(cls.dropdown, {}, [className])}>
      <Menu.Button className={cls.btn}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, [menuClasses])}>
        {items.map((item) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              disabled={item.disabled}
              className={classNames(cls.item, { [cls.active]: active })}
              onClick={item.onClick}
              type="button"
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <Menu.Item
                key={String(item.content)}
                as={AppLink}
                to={item.href}
                disabled={item.disabled}
              >
                {content}
              </Menu.Item>
            );
          }

          return (
            <Menu.Item
              key={String(item.content)}
              as={Fragment}
              disabled={item.disabled}
            >
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
});
