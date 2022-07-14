import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetId , SetType } from './actions';

export interface AppStateModel{
    id: string;
    type: number;
}

@State<AppStateModel>({
    name: 'state',
    defaults: {
        id: 'working',
        type: 0
    }
})

export class AppState{

}
