import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { ProfileRating } from '@/features/ProfileRating';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/deprecated/Stack';

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = memo(function ProfilePage(props: ProfilePageProps) {
  const { className } = props;
  const { id } = useParams<{ id: string }>();

  return (
    <Page className={classNames('', {}, [className])} data-testid="ProfilePage">
      <VStack gap="16" max>
        <EditableProfileCard id={id!} />
        <ProfileRating profileId={id!} />
      </VStack>
    </Page>
  );
});

export default ProfilePage;
