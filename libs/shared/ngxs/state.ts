import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetId , SetType } from './actions';

export interface AppStateModel{
    id: string;
    type: number;
}

@State<AppStateModel>({
    name: 'User',
    defaults: {
        id: '',
        type: 0
    }
})

export class AppState{
    @Action(SetId)
    setID({ patchState }: StateContext<AppStateModel>, { payload }: SetId) {
        patchState({id: payload});
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
}
