import { UserGroup } from '@prisma/client';

export class UserGroupDto {
  groupId: string;
  userId: string;

  constructor(userGroup: UserGroup) {
    this.groupId = userGroup.groupId;
    this.userId = userGroup.userId;
  }
}
