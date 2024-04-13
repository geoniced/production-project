import { memo } from 'react';

import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/burger.svg';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TileIcon from '@/shared/assets/icons/tile.svg';
import TileIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import {
  Button as DeprecatedButton,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Icon as DeprecatedIcon } from '@/shared/ui/deprecated/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { getHStack } from '@/shared/ui/redesigned/Stack';

import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.TILE,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => TileIcon,
      off: () => TileIconDeprecated,
    }),
  },
  {
    view: ArticleView.LIST,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => ListIcon,
      off: () => ListIconDeprecated,
    }),
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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card
          border="round"
          className={classNames(cls.articleViewSelectorRedesigned, {}, [
            className,
            getHStack({ gap: '8' }),
          ])}
        >
          {viewTypes.map((viewType) => (
            <Icon
              clickable
              onClick={createViewClickHandler(viewType.view)}
              className={classNames('', {
                [cls.notSelected]: view !== viewType.view,
              })}
              Svg={viewType.icon}
            />
          ))}
        </Card>
      }
      off={
        <div className={classNames(cls.articleViewSelector, {}, [className])}>
          {viewTypes.map((viewType) => (
            <DeprecatedButton
              theme={ButtonTheme.CLEAR}
              onClick={createViewClickHandler(viewType.view)}
              key={viewType.view}
            >
              <DeprecatedIcon
                width={24}
                height={24}
                className={classNames('', {
                  [cls.notSelected]: view !== viewType.view,
                })}
                Svg={viewType.icon}
              />
            </DeprecatedButton>
          ))}
        </div>
      }
    />
  );
});
