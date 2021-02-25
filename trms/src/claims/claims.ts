export class Claims {
    claimsId: string = '';
    usernameRequest: string = '';
    requestDetails: Details[] = [];
    usernameGiven: string = '';
    course: Course[] = [];
    approval: Approval[] = [];
}

export let idLength = 6;

export interface Details {
    first: string;
    last: string;
}

export interface Approval {
    approved: string;
    amountApproved?: number;
    declinedReason?: string;
    reasonInfo?: string;
    reasonAmountChange?: string;
    grade?: string;
    completed?: boolean;
}
export interface Course {
    description: string;
    courseType: string;
    date: string;
    time: string;
    location: string;
    cost: number;
    gradingFormat: string;
    justification: string;
}

