import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getClaim, updateClaim } from '../actions';
import { UserState, ClaimsState } from '../reducer';
import claimsService from './claims.service';

interface ClaimsDetailProps {
    match: any;
}

function ClaimsDetailComponent(props: ClaimsDetailProps) {
    const selectUser = (state: UserState) => state.user;
    const user = useSelector(selectUser);
    const selectClaim = (state: ClaimsState) => state.claim;
    const claim = useSelector(selectClaim);
    const dispatch = useDispatch();
    const history = useHistory();
    console.log('User logged in at detail screen: ' + JSON.stringify(user));
    console.log('Inital reimb in detail screen: ' + JSON.stringify(claim));

    useEffect(() => {
        claimsService.getClaim(props.match.params.id).then((claim) => {
            dispatch(getClaim(claim));
            console.log('useEffect: ' + JSON.stringify(claim));
        })
    }, [dispatch, props.match.params.id]);

    function approve() {
        let c: any = { ...claim };
        if (c.approval[0].reasonInfo) {
            c.approval[0].reasonInfo = null;
        }
        if (user.username === 'hr') {
            c.approval[0].approved = 'Approved';
            c.usernameGiven = 'N/A';
        } else if (user.superPosition) {
            c.approval[0].initApproval = user.role;
            c.usernameGiven = user.superPosition;
        } else {
            c.approval[0].secondApproval = user.username;
            c.usernameGiven = 'hr';
        }
        claimsService.updateClaim(c).then(() => {
            dispatch(updateClaim(c));
            history.push('/claims');
        });
    }

    function toReject() {
        history.push('/claims/' + claim.claimsId + '/denial');
    }

    function toInfoReq() {
        history.push('/claims/' + claim.claimsId + '/info');
    }

    function toEdit() {
        history.push('/claims/' + claim.claimsId + '/edit');
    }

    return (
        <div>
            {claim.usernameGiven ? (
                <div>
                    <p>Claim details:
                        <ul>
                            <li>{'Claim ID: ' + claim.claimsId}</li>
                            <li>{'Who: ' + claim.usernameRequest}</li>
                            <li>{claim.requestDetails[0].first}</li>
                            <li>{claim.requestDetails[0].last}</li>
                            <li>{'Assigned to: ' + claim.usernameGiven}</li>
                            <li>{'Amount requested: $' + claim.approval[0].amountApproved}</li>
                            <li>{'Status: ' + claim.approval[0].approved}</li>
                            {(() => {
                                if (claim.course[0].comments) {
                                    return (
                                        <>
                                            <br/>
                                            <li>{'Comments: ' + claim.course[0].comments}</li>
                                        </>
                                    );
                                }
                            })()}
                            {(() => {
                                if (claim.approval[0].declinedReason) {
                                    return (
                                        <>
                                            <br/>
                                            <li>{'Reason for denial: ' + claim.approval[0].declinedReason}</li>
                                        </>
                                    );
                                }
                            })()}
                            {(() => {
                                if (claim.approval[0].reasonInfo) {
                                    return (
                                        <>
                                            <br/>
                                            <li>{'Reason for information request: ' + claim.approval[0].reasonInfo}</li>
                                        </>
                                    );
                                }
                            })()}
                        </ul>
                    </p>
                    <p>Course details:
                        <ul>
                            <li>{'Course Description: ' + claim.course[0].description}</li>
                            <li>{'Course Type: ' + claim.course[0].courseType}</li>
                            <li>{'Date: ' + claim.course[0].date}</li>
                            <li>{'Time: ' + claim.course[0].time}</li>
                            <li>{'Location: ' + claim.course[0].location}</li>
                            <li>{'Total Cost: $' + claim.course[0].cost}</li>
                            <li>{'Grading Format: ' + claim.course[0].gradingFormat}</li>
                            <li>{'Business Justification: ' + claim.course[0].justification}</li>
                        </ul>
                    </p>
                    { claim.usernameGiven === user.username ? (
                        <div>
                            <button onClick={approve}>Approve</button>
                            <br />
                            <button onClick={toReject}>Deny</button>
                            <br />
                            <button onClick={toInfoReq}>Request more information</button>
                            <br />
                        </div>
                    ) : (
                        null
                    )}
                    { claim.approval[0].usernameInfoProvider === user.username || user.role === 'HR' ? (
                        <div>
                            <button onClick={toEdit}>Update</button>
                        </div>
                    ) : (
                        null
                    )}
                </div>
            ) : <div>
                Waiting...
            </div>
            }
        </div>
    )
}

export default ClaimsDetailComponent;
