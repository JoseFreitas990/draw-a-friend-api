import { GroupUser } from '@prisma/client';

export class GroupUserDto {
  groupId: string;
  userId: string;

  constructor(userGroup: GroupUser) {
    this.groupId = userGroup.groupId;
    this.userId = userGroup.userId;
  }
}
