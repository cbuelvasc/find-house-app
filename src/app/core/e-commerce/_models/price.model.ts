import { BaseModel } from '../../_base/crud';

export class Price extends BaseModel {

    sale: number;
    rent: number;

    constructor() {
        super();
    }
}
