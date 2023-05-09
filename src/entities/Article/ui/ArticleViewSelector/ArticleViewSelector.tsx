import { classNames } from "shared/lib/classNames/classNames";
import { memo } from "react";
import TileIcon from "shared/assets/icons/tiled-24-24.svg";
import ListIcon from "shared/assets/icons/list-24-24.svg";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Icon } from "shared/ui/Icon/Icon";
import { ArticleView } from "../../model/types/article";
import cls from "./ArticleViewSelector.module.scss";

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.TILE,
    icon: TileIcon,
  },
  {
    view: ArticleView.LIST,
    icon: ListIcon,
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props;

  const createViewClickHandler = (newTheme: ArticleView) => () => {
    onViewClick(newTheme);
  };

  return (
    <div className={classNames(cls.articleViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button theme={ButtonTheme.CLEAR} onClick={createViewClickHandler(viewType.view)} key={viewType.view}>
          <Icon className={classNames("", { [cls.notSelected]: view !== viewType.view })} Svg={viewType.icon} />
        </Button>
      ))}
    </div>
  );
});
