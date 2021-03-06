import log from './log';

export function idGen(numLength: number) {
    log.debug('Generating a random ID');
    let id: string = ""
    for (let i: number = 0; i < numLength; ++i) {
        id += Math.floor(Math.random() * 10);
    }
    return id;
}

export function claimCalculation(amount: number, courseType: string) {
    let pctUni: number = 0.8;
    let pctSem: number = 0.6;
    let pctCertPrep: number = 0.75;
    let pctCert: number = 1;
    let pctTech: number = 0.9;
    let pctOther: number = 0.3;

    switch (courseType) {
        case 'Uni':
            return (amount * pctUni);
        case 'Sem':
            return (amount * pctSem);
        case 'CertPrep':
            return (amount * pctCertPrep);
        case 'Cert':
            return (amount * pctCert);
        case 'Tech':
            return (amount * pctTech);
        case 'pctOther':
            return (amount * pctOther);
    }
}
