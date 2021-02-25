import React from 'react';
import { Link } from 'react-router-dom';
import { claimCalculation } from '../calculations';
import { Claims } from './claims';

interface ClaimsProps {
    data: Claims;
}

function ClaimsComponent(props: ClaimsProps) {
    return (
        <div>
            <p>
                {'Claim Id: '}
                <Link to = {`/claims/${props.data.claimsId}`}>
                    {props.data.claimsId}
                </Link>
                {
                    `{
                    Username: ${props.data.usernameRequest},
                    Name:  ${props.data.requestDetails[0].first}, 
                    Employee Type: ${props.data.requestDetails[0].last},   
                    Amount: $${props.data.approval[0].amountApproved},
                    Approved Status: ${props.data.approval[0].approved}
                    }`
                }
            </p>
            <br/>
        </div>
    );

}

export default ClaimsComponent;
