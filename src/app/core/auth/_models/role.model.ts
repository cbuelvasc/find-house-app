import { BaseModel } from '../../_base/crud';

export class Role extends BaseModel {
  id: string;
  title: string;
  permissions: string[];
  isCoreRole = false;

  clear(): void {
    this.id = undefined;
    this.title = '';
    this.permissions = [];
    this.isCoreRole = false;
  }
}
