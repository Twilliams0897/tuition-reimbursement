import { SyntheticEvent, useEffect } from 'react';
import claimService from './claims.service';
import {withRouter, useHistory} from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { ClaimsState, UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { updateClaim } from '../actions';
import { claimCalculation } from '../calculations';


interface Params {
    id: string;
}
// Function Component
function EditClaimsComponent(props: RouteComponentProps<Params>) {
    const selectUser = (state: UserState) => state.user;
    const user = useSelector(selectUser);
    const selectClaim = (state: ClaimsState) => state.claim;
    const claim = useSelector(selectClaim);
    const dispatch = useDispatch();
    const history = useHistory();
    
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
                c.course[0].amount = Number((e.target as HTMLInputElement).value);
                break;
            case 'gradingFormat':
                c.course[0].gradingFormat = (e.target as HTMLInputElement).value;
                break;
            case 'justification':
                c.course[0].justification = (e.target as HTMLInputElement).value;
                break;
            case 'comments':
                c.course[0].comments = (e.target as HTMLInputElement).value;
                break;
            case 'approvedAmount':
                c.approval[0].approvedAmount = (e.target as HTMLInputElement).value;
                break;
            case 'reasonAmountChange':
                c.approval[0].reasonAmountChange = (e.target as HTMLInputElement).value;
                break;
        }
        c.course[0].courseType = selectCourseType();
        c.course[0].gradingFormat = selectGradingFormat();
        if (c.course[0].gradingFormat === 'A-F') {
            c.course[0].passingGrade = selectMinGrade();
        } else {
            c.course[0].passingGrade = '';
        }
        dispatch(updateClaim(c));
    }

    function resubmitForm() {
        let c: any = { ...claim };
        c.approval[0].usernameInfoProvider = null;
        c.approval[0].usernameInfoRequestor = null;
        c.approval[0].approved = 'Pending';
        c.approval[0].approvedAmount = claimCalculation(c.course[0].amount, c.course[0].courseType);
        console.log('Resubmitting claim: ' + JSON.stringify(claim));
        claimService.updateClaim(claim).then(() => {
            dispatch(updateClaim(claim));
            history.push('/claims');
        });
    }

    function submitForm() {
        let c: any = { ...claim };
        c.course[0].courseType = selectCourseType();
        c.course[0].gradingFormat = selectGradingFormat();
        if (c.course[0].gradingFormat === 'A-F') {
            c.course[0].passingGrade = selectMinGrade();
        } else {
            c.course[0].passingGrade = '';
        }
        c.approval[0].approved = 'Pending';
        c.approval[0].approvedAmount = claimCalculation(c.course[0].amount, c.course[0].courseType);
        console.log('Submitting claim: ' + JSON.stringify(claim));
        claimService.updateClaim(claim).then(() => {
            dispatch(updateClaim(claim));
            history.push('/claims');
        });
    }

    function submitAmount() {
        let c: any = { ...claim }
        c.approval[0].usernameInfoRequestor = user.username;
        c.approval[0].usernameInfoProvider = c.usernameRequest;
        c.approval[0].approved = 'Awaiting info';
        console.log('Submitting claim: ' + JSON.stringify(claim));
        claimService.updateClaim(claim).then(() => {
            dispatch(updateClaim(claim));
            history.push('/claims');
        });
    }

    function cancel() {
        history.push('/claims/' + claim.claimsId);
    }

    function selectCourseType() {
        let selector: string = (document.getElementById('courseSelect') as HTMLInputElement).value;
        console.log(selector);
        return selector;
    }

    function selectGradingFormat() {
        let selector: string = (document.getElementById('gradingFormatSelect') as HTMLInputElement).value;
        return selector;
    }

    function selectMinGrade() {
        if (document.getElementById('minGradeSelect') as HTMLInputElement) {
            let selector: string = (document.getElementById('minGradeSelect') as HTMLInputElement).value;
            return selector;
        } else {
            return '';
        }
    }

    return (
        <div className = 'formContainer'>
            {(() => {
                if (user.username === claim.approval[0].usernameInfoProvider) {
                    return (
                        <p className = 'form'>
                            {(() => {
                                if (claim.approval[0].usernameInfoProvider && claim.approval[0].usernameInfoProvider === user.username) {
                                    return (
                                        <p>
                                            Reason for information request: {claim.approval[0].reasonInfo}
                                            <br/>
                                        </p>
                                    )
                                }
                            })()}
                            Course description: <input type='text' className='form-control' value={claim.course.map((item) => {return item.description})} onChange={handleFormInput} name='description'/>
                            <br/>
                            Course type:
                            <select id="courseSelect">
                                <option value='Uni'>University-level course</option>
                                <option value='Sem'>Seminar</option>
                                <option value='CertPrep'>Certification Preparation Class</option>
                                <option value='Cert'>Certification</option>
                                <option value='Tech'>Technical Training</option>
                                <option value='Other'>Other</option>
                            </select>
                            <br/>
                            Date: <input type='text' className='form-control' value={claim.course.map((item) => {return item.date})} onChange={handleFormInput} name='date'/>
                            <br/>
                            Time: <input type='text' className='form-control' value={claim.course.map((item) => {return item.time})} onChange={handleFormInput} name='time'/>
                            <br/>
                            Location: <input type='text' className='form-control' value={claim.course.map((item) => {return item.location})} onChange={handleFormInput} name='location'/>
                            <br/>
                            Total cost of course: <input type='text' className='form-control' value={claim.course.map((item) => {return String(item.cost)})} onChange={handleFormInput} name='amount'/>
                            <br/>
                            Projected reimbursement: {claim.approval[0].amountApproved}
                            <br/>
                            Grading format:
                            <select id='gradingFormatSelect'>
                                <option value='A-F'>A-F</option>
                                <option value='Pass/Fail'>Pass/Fail</option>
                                <option value='Complete/Incomplete'>Complete/Incomplete</option>
                                <option value='Presentation'>Presentation</option>
                            </select>
                            <br/>
                            Minimum passing grade:
                            <select id='minGradeSelect'>
                                <option value='N/A'>N/A</option>
                                <option value='A'>A</option>
                                <option value='B'>B</option>
                                <option value='C'>C</option>
                                <option value='D'>D</option>
                            </select>
                            <br/>
                            Business justification: <input type='text' className='form-control' value={claim.course.map((item) => {return item.justification})} onChange={handleFormInput} name='justification'/>
                            <br/>
                            Comments: <input type='text' className='form-control' value={claim.course.map((item) => {return item.comments})} onChange={handleFormInput} name='comments'/>
                            {(() => {
                                if (claim.approval[0].usernameInfoProvider && claim.approval[0].usernameInfoProvider === user.username) {
                                    return (<button className='formButton' onClick={resubmitForm}>Resubmit</button>)
                                } else {
                                    return (<button className='formButton' onClick={submitForm}>Submit</button>)
                                }
                            })()}
                            <button onClick={cancel}>Cancel</button>
                        </p>
                        )
                    }
            })()}
            {(() => {
                if (user.role === 'HR') {
                    return (
                        <p className='form'>
                            Reimbursement amount: <input type='text' className='form-control' value={claim.approval[0].amountApproved} onChange={handleFormInput} name='approvedAmount'/>
                            <br/>
                            Reason for change in amount: <input type='text' className='form-control' value={claim.approval[0].reasonAmountChange} onChange={handleFormInput} name='reasonAmountChange'/>
                            <button className='formButton' onClick={submitAmount}>Submit</button>
                            <button onClick={cancel}>Cancel</button>
                        </p>
                    )
                }
            })()}
        </div>
    )
}


export default withRouter(EditClaimsComponent);
