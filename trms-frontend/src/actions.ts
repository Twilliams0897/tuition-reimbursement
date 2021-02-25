import {Claims} from './claims/claims';
import {User} from './user/user';

export enum ClaimsActions {
    GetClaims = 'GET_CLAIMS',
    GetClaim ='GET_CLAIM',
    ChangeClaim = 'CHANGE_CLAIM'
}

export enum UserActions {
    GetUser = 'GET_USER',
    LoginChange = 'CHANGE_LOGIN'
}
export interface AppAction {
    type: string;
    payload: any;
}
export interface UserAction extends AppAction {
    type: UserActions;
    payload: User;
}
export interface ClaimsAction extends AppAction {
    type: ClaimsActions;
    payload: Claims | Claims[];
}

export function getClaims(claims: Claims[]): ClaimsAction {
    const action: ClaimsAction = {
        type: ClaimsActions.GetClaims,
        payload: claims
    }
    return action;
}

export function getClaim(claim:Claims): ClaimsAction {
    const action: ClaimsAction = {
        type: ClaimsActions.GetClaim,
        payload: claim
    }
    return action;
}

export function updateClaim (claim: Claims): ClaimsAction {
    const action: ClaimsAction = {
        type: ClaimsActions.ChangeClaim,
        payload: claim
    }
    return action;
}

export function getUser(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.GetUser,
        payload: user
    }
    return action;
}

export function loginAction(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.LoginChange,
        payload: user
    }
    return action;
}