import { Fragment, memo, ReactNode } from "react";
import { Menu } from "@headlessui/react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { DropdownDirection } from "@/shared/types/ui";
import { mapDirectionToClass } from "../../styles/consts";
import { AppLink } from "../../../AppLink/AppLink";
import cls from "./Dropdown.module.scss";
import popupCls from "../../styles/popups.module.scss";

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

export const Dropdown = memo(function Dropdown(props: DropdownProps) {
  const { className, trigger, items, direction = "bottom left" } = props;

  const menuClasses = mapDirectionToClass[direction];

  return (
    <Menu as="div" className={classNames(popupCls.popup, {}, [className])}>
      <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, [menuClasses])}>
        {items.map((item, index) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              disabled={item.disabled}
              className={classNames(cls.item, { [popupCls.active]: active })}
              onClick={item.onClick}
              type="button"
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <Menu.Item
                key={`dropdown-key-${index}`}
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
              key={`dropdown-key-${index}`}
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
