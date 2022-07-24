import { Selector } from "@ngxs/store";
import { AppState, AppStateModel } from "./state";

export class AppSelectors{
    @Selector([AppState])
    static getId(state : AppStateModel) : string {
        return state.id;
    }
}