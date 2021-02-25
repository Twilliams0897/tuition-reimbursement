import {AppState} from '../../../p1/trms-frontend/src/reducer';
import {AppAction, getClaims} from '../../../p1/trms-frontend/src/actions';
import {ThunkAction} from 'redux-thunk';
import claimsService from '../../../p1/trms-frontend/src/claims/claims.service';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AppAction>;

export const thunkGetClaims = (): AppThunk => async dispatch => {
    const asyncResp = await claimsService.getClaims();
    console.log('before thunk dispatch');
    dispatch(getClaims(asyncResp));
}