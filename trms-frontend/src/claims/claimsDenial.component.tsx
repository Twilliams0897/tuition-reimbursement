import { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getClaim, updateClaim } from '../actions';
import { UserState, ClaimsState } from '../reducer';
import claimsService from './claims.service';

function ClaimsDenialComponent() {
    const selectUser = (state: UserState) => state.user;
    const user = useSelector(selectUser);
    const selectClaim = (state: ClaimsState) => state.claim;
    const claim = useSelector(selectClaim);
    const dispatch = useDispatch();
    const history = useHistory();

    function handleDenialFormInput(e: SyntheticEvent) {
        let c: any = {...claim};
        c.usernameGiven = 'N/A';
        c.approval[0].approved = 'Denied';
        c.approval[0].reasonDeclined = ((e.target as HTMLInputElement).value);
        if (c.approval[0].reasonInfo) {
            c.approval[0].reasonInfo = null;
        }
        dispatch(updateClaim(c));
    }

    function submitForm() {
        console.log('Rejecting claims: ' + JSON.stringify(claim));
        claimsService.updateClaim(claim).then(() => {
            dispatch(updateClaim(claim));
            history.push('/claims');
        });
    }

    function cancel() {
        history.push('/claims/' + claim.claimsId);
    }

    return (
        <div className='form'>
            Reason for denial: <input type='text' className='form-control' onChange={handleDenialFormInput} name='description'/>
            <button onClick={submitForm}>Submit</button>
            <button onClick={cancel}>Cancel</button>
        </div>
    )
}

export default ClaimsDenialComponent;
