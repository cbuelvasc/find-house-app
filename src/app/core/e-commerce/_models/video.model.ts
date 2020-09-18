import { BaseModel } from '../../_base/crud';

export class Video extends BaseModel {

    id: number;
    name: string;
    link: string;

    constructor() {
        super();
    }
}
