import { SyntheticEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './restaurant.css'
import { getClaim, updateClaim } from '../actions';
import { UserState, ClaimsState } from '../reducer';
import claimsService from './claims.service';
import { claimCalculation, randomId } from '../calculations';

function AddClaimComponent() {
    const selectUser = (state: UserState) => state.user;
    const user = useSelector(selectUser);
    const selectClaim = (state: ClaimsState) => state.claim;
    const claim = useSelector(selectClaim);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        let c: any = { ...claim}
        
        c.course[0].description = null;
        c.course[0].courseType = null;
        c.course[0].date = null;
        c.course[0].time = null;
        c.course[0].location = null;
        c.course[0].cost = null;
        c.course[0].gradingFormat = null;
        c.course[0].justification = null;
        c.course[0].comments = null;
        c.approval[0].initApproval = null;
        c.approval[0].secondApprover = null;
        c.approval[0].approved = null;
        c.approval[0].declinedReason = null;
        c.approval[0].reasonInfo = null;
        c.approval[0].usernameInfoRequestor= null;
        c.approval[0].usernameInfoProvider = null;
        c.approval[0].reasonAmountChange = null;
        c.approval[0].grade = null;
        c.approval[0].completed = null;
        console.log('Add Claim useEffect' + JSON.stringify(c));
        dispatch(getClaim(c));
        //dispatch(updateClaim(c));
    }, []);

    function handleFormInput(e: SyntheticEvent) {
        let c: any = { ...claim };
        switch ((e.target as HTMLInputElement).name) {
            case 'description':
                c.course[0].description = ((e.target as HTMLInputElement).value);
                break;
            case 'date':
                c.course[0].date = (e.target as HTMLInputElement).value;
                break;
            case 'time':
                c.course[0].time = (e.target as HTMLInputElement).value;
                break;
            case 'location':
                c.course[0].location = (e.target as HTMLInputElement).value;
                break;
            case 'amount':
                c.course[0].cost = Number((e.target as HTMLInputElement).value);
                break;
            case 'gradingFormat':
                c.course[0].gradingFormat = (e.target as HTMLInputElement).value;
                break;
            case 'justification':
                c.course[0].justification = (e.target as HTMLInputElement).value;
                break;
        }
        c.claimId = randomId(6);
        console.log(c.claimId);
        c.usernameRequest = user.username;
        if (user.superPosition) {
            c.usernameGiven = user.superPosition;
        } else {
            c.usernameGiven = user.username;
        }
        c.requestDetails = [{ first: user.first, last: user.last }];
        console.log('running handleFormInput')
        dispatch(updateClaim(c));
    }

    function submitForm() {
        let c = { ...claim };
        c.course[0].courseType = selectCourseType();
        c.approval[0].approved = 'Pending'
        c.approval[0].amountApproved = Number(claimCalculation(c.course[0].cost, c.course[0].courseType));
        console.log('Submitting claim: ' + JSON.stringify(claim));
        claimsService.addClaim(claim).then(() => {
            dispatch(updateClaim(claim));
            history.push('/home');
        });
    }

    function cancel() {
        history.push('/home');
    }

    function selectCourseType() {
        let selector: string = (document.getElementById('courseSelect') as HTMLInputElement).value;
        console.log(selector);
        return selector;
    }

    return (
        <div className='formContainer'>
            <p className='form'>
                Course description: <input type='text' className='form-control' onChange={handleFormInput} name='description' />
                <br />
                Course type: {/*<input type='text' className='form-control' onChange={handleFormInput} name='courseType'/>*/}
                <select id="courseSelect">
                    <option value='Uni'>University-level course</option>
                    <option value='Sem'>Seminar</option>
                    <option value='CertPrep'>Certification Preparation Class</option>
                    <option value='Cert'>Certification</option>
                    <option value='Tech'>Technical Training</option>
                    <option value='Other'>Other</option>
                </select>
                <br />
                Date: <input type='text' className='form-control' onChange={handleFormInput} name='date' />
                <br />
                Time: <input type='text' className='form-control' onChange={handleFormInput} name='time' />
                <br />
                Location: <input type='text' className='form-control' onChange={handleFormInput} name='location' />
                <br />
                Total cost of course: <input type='text' className='form-control' onChange={handleFormInput} name='amount' />
                <br />
                Grading format: <input type='text' className='form-control' onChange={handleFormInput} name='gradingFormat' />
                <br />
                Business justification: <input type='text' className='form-control' onChange={handleFormInput} name='justification' />
                <br />
                <button className='formButton' onClick={submitForm}>Submit claim request</button>
                <button onClick={cancel}>Cancel</button>
            </p>
        </div>
    )
}

export default AddClaimComponent;
