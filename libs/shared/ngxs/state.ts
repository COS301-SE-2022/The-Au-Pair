import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetId , SetType, SetFcmToken, SetName, Reset, SetLoggedIn, SetCurrentActivity } from './actions';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
export interface AppStateModel{
    id: string;
    name: string;
    type: number;
    fcmToken: string;
    loggedIn: boolean;
    currentActivity: string;
}

@State<AppStateModel>({
    name: 'user',
    defaults: {
        id: '',
        type: -1,
        name: '',
        fcmToken: '',
        loggedIn : false,
        currentActivity : ''
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

    @Action(SetCurrentActivity)
    setCurrentActivity({ patchState }: StateContext<AppStateModel>, { payload }: SetCurrentActivity) {
        patchState({currentActivity: payload});
    }

    @Selector()
    static getCurrentActivity(state : AppStateModel) {
        return state.currentActivity;
    }

    @Action(Reset)
    reset(ctx: StateContext<AppStateModel>): Observable<AppStateModel> {
        return of(ctx.getState())
        .pipe(
        map(currentState => {
            ctx.patchState({type: -1, id: "", name: "", fcmToken: "", loggedIn: false, currentActivity: ""});
            return currentState;
        })
        );
    }
}
