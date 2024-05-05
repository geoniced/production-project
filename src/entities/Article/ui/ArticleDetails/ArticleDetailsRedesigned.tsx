import { useSelector } from 'react-redux';

import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

import { renderArticleBlock } from './renderArticleBlock';
import { getArticleDetailsData } from '../../model/selectors/articleDetails';
import cls from './ArticleDetails.module.scss';

export const ArticleDetailsRedesigned = () => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      <Text
        title={article?.title}
        size="l"
        bold
        data-testid="ArticleDetails.Title"
      />
      <Text title={article?.subtitle} data-testid="ArticleDetails.SubTitle" />
      <AppImage
        src={article?.img}
        fallback={<Skeleton width="100%" height="420px" borderRadius="16px" />}
        className={cls.img}
      />

      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};
