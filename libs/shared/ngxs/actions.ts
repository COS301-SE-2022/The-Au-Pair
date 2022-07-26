export class SetId{
    static readonly type = '[User] set id';
    constructor(public payload: string) {}
}

export class SetType{
    static readonly type = '[User] set type';
    constructor(public payload: number) {}
}

export class SetFcmToken{
    static readonly type = '[User] set fcmToken';
    constructor(public payload: string) {}
}

export class Reset{
    static readonly type = '[AppState] Reset Store';
}
