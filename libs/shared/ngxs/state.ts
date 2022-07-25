import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetId , SetType, SetFcmToken, Navigate } from './actions';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface AppStateModel{
    id: string;
    type: number;
    fcmToken: string;
}

@State<AppStateModel>({
    name: 'user',
    defaults: {
        id: '',
        type: 0,
        fcmToken: ''
    },
})

@Injectable()
export class AppState{
    constructor(private router: Router){}

    @Action(SetId)
    setId({ patchState }: StateContext<AppStateModel>, { payload }: SetId) {
        patchState({id: payload});
    }

    @Action(Navigate)
    changeRoute(ctx: StateContext<string>, { payload }: Navigate) {
        const state = ctx.getState();
        this.router.navigate([payload]);
        ctx.setState(state);
    }
    
    @Selector()
    static getID(state : AppStateModel) {
        return state.id;
    }
    @Action(SetType)
    setType({ patchState }: StateContext<AppStateModel>, { payload }: SetType) {
        patchState({type: payload});
    }

    @Selector()
    static getType(state : AppStateModel) {
        return state.id;
    }

    @Action(SetFcmToken)
    setFcmToken({ patchState }: StateContext<AppStateModel>, { payload }: SetFcmToken) {
        patchState({fcmToken: payload});
    }

    @Selector()
    static getFcmToken(state : AppStateModel) {
        return state.fcmToken;
    }
}
