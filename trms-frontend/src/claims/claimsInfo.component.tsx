import { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { updateClaim } from '../actions';
import { UserState, ClaimsState } from '../reducer';
import claimsService from './claims.service';

function ClaimsInfoComponent() {
    const selectUser = (state: UserState) => state.user;
    const user = useSelector(selectUser);
    const selectReimb = (state: ClaimsState) => state.claim;
    const claim = useSelector(selectReimb);
    const dispatch = useDispatch();
    const history = useHistory();
    console.log(JSON.stringify(claim.approval[0].initApproval));

    function handleFormInput(e: SyntheticEvent) {
        let c: any = { ...claim };
        c.approval[0].reasonInfo = ((e.target as HTMLInputElement).value);
        c.approval[0].usernameInfoRequestor = user.username;
        c.approval[0].approved = 'Awaiting info';
        dispatch(updateClaim(c));
    }

    function submitForm() {
        let c: any = { ...claim }
        c.approval[0].usernameInfoProvider = selectInfoProvider();
        claimsService.updateClaim(claim).then(() => {
            dispatch(updateClaim(claim));
            history.push('/claims');
        });
    }

    function cancel() {
        history.push('/claims/' + claim.claimsId);
    }

    function selectInfoProvider() {
        let selector: string = (document.getElementById('recipientSelect') as HTMLInputElement).value;
        console.log(selector);
        return selector;
    }

    return (
        <div className='form'>
            Choose a recipient:
            <select id="recipientSelect">
                <option value={claim.usernameRequest}>{claim.usernameRequest}</option>
                {(() => {
                    if (claim.approval[0].initApproval) {
                        return (
                            <option value={claim.approval[0].initApproval}>{claim.approval[0].initApproval}</option>
                        );
                    }
                })()}
                {(() => {
                    if (claim.approval[0].secondApproval) {
                        return (
                            <option value={claim.approval[0].secondApproval}>{claim.approval[0].secondApproval}</option>
                        );
                    }
                })()}
            </select>
            <br/>
            <br/>
            Reason for information request: <input type='text' className='form-control' onChange={handleFormInput} name='description' />
            <button onClick={submitForm}>Submit</button>
            <button onClick={cancel}>Cancel</button>
        </div>
    )
}

export default ClaimsInfoComponent;
