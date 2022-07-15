export class SetId{
    static readonly type = '[User] set id';
    constructor(public payload: string) {}
}

export class SetType{
    static readonly type = '[User] set type';
    constructor(public payload: number) {}
}
