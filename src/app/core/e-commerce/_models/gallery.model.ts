import { BaseModel } from '../../_base/crud';

export class Gallery extends BaseModel {

    id: number;
    small: string;
    medium: string;
    big: string;

    constructor() {
        super();
    }
}
