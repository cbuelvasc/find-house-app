import { BaseModel } from '../../_base/crud';

export class Area extends BaseModel {

    id: number;
    value: number;
    unit: string;

    constructor() {
        super();
    }
}
