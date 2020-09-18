import { BaseModel } from '../../_base/crud';

export class AdditionalFeature extends BaseModel {
    id: number;
    name: string;
    value: string;

    constructor() {
        super();
    }
}
