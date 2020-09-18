import { BaseModel } from '../../_base/crud';

export class Permission extends BaseModel {
  id: string;
  title: string;
  level: number;
  parentId: string;
  isSelected: boolean;
  name: string;
  // tslint:disable-next-line
  _children: Permission[];

  clear(): void {
    this.id = undefined;
    this.title = '';
    this.level = 1;
    this.parentId = '';
    this.isSelected = false;
    this.name = '';
    this._children = [];
  }
}
