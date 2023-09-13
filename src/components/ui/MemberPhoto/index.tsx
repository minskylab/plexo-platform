import { Avatar } from "@mantine/core";

export const MemberPhoto = (photoUrl: string | undefined | null) => {
  return photoUrl ? (
    <Avatar src={photoUrl} size="xs" radius="xl" />
  ) : (
    <Avatar size="sm" radius="xl" />
  );
};
