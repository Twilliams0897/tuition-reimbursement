export class Claims {
    claimsId: string = '';
    usernameRequest: string= '';
    requestDetails: Details[] = [];
    usernameGiven: string = '';
    course: Course[] = [];
    approval: Approval[] = [];
}
export interface Details {
    first: string;
    last: string;
}

export class Approval {
    initApproval: string = '';
    secondApproval: string = '';
    approved: string = '';
    amountApproved?: number;
    declinedReason?: string;
    reasonInfo?: string;
    reasonAmountChange?: string;
    usernameInfoRequestor?: string;
    usernameInfoProvider?: string;
    grade?: string;
    completed?: boolean;
}
export class Course {
    description: string = '';
    courseType: string = '';
    date: string = '';
    time: string = '';
    location: string = '';
    cost: number = 0;
    gradingFormat: string = '';
    justification: string = '';
    comments: string = '';
}

