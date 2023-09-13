import { memo } from "react";
import { useParams } from "react-router-dom";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Page } from "@/widgets/Page/Page";
import { VStack } from "@/shared/ui/Stack/VStack/VStack";
import { EditableProfileCard } from "@/features/EditableProfileCard";

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = memo(function ProfilePage(props: ProfilePageProps) {
  const { className } = props;
  const { id } = useParams<{ id: string }>();

  return (
    <Page className={classNames("", {}, [className])}>
      <VStack gap="16" max>
        <EditableProfileCard id={id!} />
      </VStack>
    </Page>
  );
});

export default ProfilePage;
