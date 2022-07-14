export class SetId{
    static readonly type = '[state] set id';
    constructor(public payload: string) {}
}

export class SetType{
    static readonly type = '[state] set type';
    constructor(public payload: number) {}
}
