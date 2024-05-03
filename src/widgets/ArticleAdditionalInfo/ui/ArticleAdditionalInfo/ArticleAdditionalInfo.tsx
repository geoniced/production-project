import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { EditArticleButton } from '@/features/EditArticle';
import { User } from '@/entities/User';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleAdditionalInfoProps {
  articleId: string;
  className?: string;
  author: User;
  createdAt: string;
  views: number;
}

export const ArticleAdditionalInfo = memo(
  (props: ArticleAdditionalInfoProps) => {
    const { className, author, views, createdAt, articleId } = props;

    const { t } = useTranslation('article-details');

    return (
      <VStack gap="32" className={className}>
        <HStack gap="8">
          <Avatar src={author.avatar} size={32} />
          <Text text={author.username} bold />
          <Text text={createdAt} />
        </HStack>

        <EditArticleButton />

        <Text text={t('views_count', { count: views })} />
      </VStack>
    );
  },
);
