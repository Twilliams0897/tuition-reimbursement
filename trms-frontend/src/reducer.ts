import * as Actions from './actions';
import { Claims } from './claims/claims';
import { User } from '../src/user/user';

export interface ClaimsState {
    claims: Claims[];
    claim: Claims;
}
export interface UserState {
    user: User;
    loginUser: User;
}
export interface AppState extends UserState, ClaimsState { }

export const initialState: AppState = {
    user: new User(),
    loginUser: new User(),
    claims: [],
    claim: new Claims()

}

const reducer = (state: AppState = initialState, action: Actions.AppAction): AppState => {
    console.log(action);
    const newState = {...state};

    switch (action.type) {
        case Actions.UserActions.GetUser:
            console.log(action.type);
            newState.user = action.payload as User;
            return newState;
        case Actions.UserActions.LoginChange:
            newState.loginUser = action.payload as User;
            return newState;
        case Actions.ClaimsActions.GetClaims:
            console.log(action.type);
            newState.claims = action.payload as Claims[];
            return newState;
        case Actions.ClaimsActions.GetClaim:
            console.log(action.type);
            newState.claim = action.payload as Claims;
            return newState;
        case Actions.ClaimsActions.ChangeClaim:
            console.log(action.type);
            newState.claim = action.payload as Claims;
            console.log('Action payload: ' + newState.claim);
            return newState;
        default:
            console.log('No action given');
            return state;
    }
}

export default reducer;
