import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetId , SetType, SetFcmToken, SetName, Reset, SetChildren, SetAuPair, SetLoggedIn } from './actions';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
export interface AppStateModel{
    id: string;
    name: string;
    type: number;
    children: [];
    auPair: string;
    fcmToken: string;
    loggedIn: boolean;
}

@State<AppStateModel>({
    name: 'user',
    defaults: {
        id: '',
        type: -1,
        name: '',
        children: [],
        auPair: '',
        fcmToken: '',
        loggedIn : false
    },
})

@Injectable()
export class AppState{

    @Action(SetId)
    setId({ patchState }: StateContext<AppStateModel>, { payload }: SetId) {
        patchState({id: payload});
    }
    
    @Selector()
    static getID(state : AppStateModel) {
        return state.id;
    }

    @Action(SetLoggedIn)
    setLoggedIn({ patchState }: StateContext<AppStateModel>, { payload }: SetLoggedIn) {
        patchState({loggedIn: payload});
    }
    
    @Selector()
    static getLoggedIn(state : AppStateModel) {
        return state.loggedIn;
    }

    @Action(SetName)
    setName({ patchState }: StateContext<AppStateModel>, { payload }: SetName) {
        patchState({name: payload});
    }
    
    @Selector()
    static getName(state : AppStateModel) {
        return state.name;
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

    @Action(Reset)
    reset(ctx: StateContext<AppStateModel>): Observable<AppStateModel> {
        return of(ctx.getState())
        .pipe(
        map(currentState => {
            ctx.patchState({type: -1, id: "", name: "", fcmToken: "", loggedIn: false});
            return currentState;
        })
        );
    }

    @Action(SetChildren)
    setChildren({ patchState }: StateContext<AppStateModel>, { payload }: SetChildren) {
        patchState({children: payload});
    }
    
    @Selector()
    static getChildren(state : AppStateModel) {
        return state.children;
    }

    @Action(SetAuPair)
    setAuPair({ patchState }: StateContext<AppStateModel>, { payload }: SetAuPair) {
        patchState({auPair: payload});
    }
    
    @Selector()
    static getAuPair(state : AppStateModel) {
        return state.auPair;
    }
}
