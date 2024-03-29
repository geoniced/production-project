import { memo } from 'react';

import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import TileIcon from '@/shared/assets/icons/tiled-24-24.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import cls from './ArticleViewSelector.module.scss';

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

export const ArticleViewSelector = memo(function ArticleViewSelector(
  props: ArticleViewSelectorProps,
) {
  const { className, view, onViewClick } = props;

  const createViewClickHandler = (newTheme: ArticleView) => () => {
    onViewClick(newTheme);
  };

  return (
    <div className={classNames(cls.articleViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button
          theme={ButtonTheme.CLEAR}
          onClick={createViewClickHandler(viewType.view)}
          key={viewType.view}
        >
          <Icon
            width={24}
            height={24}
            className={classNames('', {
              [cls.notSelected]: view !== viewType.view,
            })}
            Svg={viewType.icon}
          />
        </Button>
      ))}
    </div>
  );
});
