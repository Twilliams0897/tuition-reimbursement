import axios from 'axios';
import { Claims } from './claims';

class ClaimsService {
    private URI: string;
    constructor() {
        // URL of the express server
        this.URI = 'http://localhost:3000/claims';
    }

    getClaims(): Promise<Claims []> {
        return axios.get(this.URI).then(result => result.data);
    }
    getClaim(id: string): Promise<Claims> {
        return axios.get(this.URI+'/'+id).then(result=>result.data);
    }
    addClaim(c: Claims): Promise<null> {
        return axios.post(this.URI, c).then(result => null);
    }
    updateClaim(c: Claims): Promise<null> {
        return axios.put(this.URI, c).then(result => null);
    }

    deleteClaim(id: string): Promise<null> {
        console.log(id);
        return axios.delete(this.URI+'/'+id, {withCredentials: true}).then(result => null)
    }
}

export default new ClaimsService();