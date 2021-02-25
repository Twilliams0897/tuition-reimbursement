import React from 'react';
import { Claims } from './claims';

import claimsService from './claims.service';

interface CProps {
    which: number;
}
interface CState {
    data: Claims[];
}
class ClaimClassComponent extends React.Component<CProps, CState> {
    constructor(props: any) {
        super(props);
        console.log('Mounting: Constructor!');
        this.state = {data: []};
    }

    componentDidMount() {
        console.log('Mounted Component');
        claimsService.getClaims().then((data) => {
            console.log(data);
            this.setState({data: data});
        });
    }

    componentWillUnmount(){
        console.log('Component is removed from dom.');
    }

    shouldComponentUpdate(){
        console.log('If this returns false, it will not update');
        return true;
    }

    componentDidUpdate() {
        console.log('updated Component');
    }

    render() {
        console.log('render');
        return (
            <div>
            <h1>Claim</h1>
            <p>{this.state.data.length ? this.state.data[this.props.which].claimsId: ''}</p>
            </div>
        );
    }
}


export default ClaimClassComponent;