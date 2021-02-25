import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getClaims } from '../actions';
import { UserState, ClaimsState } from '../reducer';
import ReimbComponent from './claims.component';
import reimbService from './claims.service';

function ClaimsListComponent() {
    const selectClaim = (state: ClaimsState) => state.claims;
    const claim = useSelector(selectClaim);
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch: any = useDispatch();
    
    useEffect(() => {
        reimbService.getClaims().then((items) => {
            dispatch(getClaims(items))
        })
    }, [dispatch]);

    return (
        <div>
            <p>
                { (() => {
                    if (claim.filter(claim => claim.approval[0].usernameInfoProvider === user.username).length > 0) {
                        console.log('');
                        return (
                            <p>Additional information required:</p>
                        )
                    }
                })()}
                {claim.map((value, index: number) => {
                    if (user.username === value.approval[0].usernameInfoProvider) {
                        return (
                            <ReimbComponent
                                key={'claim-' + index}
                                data={value}
                            ></ReimbComponent>
                        );
                    } else {
                        return null;
                    }
                })}
                { (() => {
                    if (claim.filter(reimb => reimb.usernameRequest === user.username).length > 0) {
                        console.log('');
                        return (
                            <p>My Requests:</p>
                        )
                    }
                })()}
                {claim.map((value, index: number) => {
                    if (user.username === value.usernameRequest) {
                        return (
                            <ReimbComponent
                                key={'claim-' + index}
                                data={value}
                            ></ReimbComponent>
                        );
                    } else {
                        return null;
                    }
                })}
            </p>
            <p>
                { (() => {
                    if (claim.filter(claim => claim.usernameGiven === user.username).length > 0) {
                        console.log('');
                        return (
                            <p>Assigned to me:</p>
                        )
                    }
                })()}
                {claim.map((value, index: number) => {
                    if (user.username === value.usernameGiven) {
                        return (
                            <ReimbComponent
                                key={'claim-' + index}
                                data={value}
                            ></ReimbComponent>
                        );
                    } else {
                        return null;
                    }
                })}
            </p>
        </div>
    )
}

export default ClaimsListComponent;
