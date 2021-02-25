import { useSelector} from 'react-redux';
import { Link, Route, Redirect } from 'react-router-dom';

import { UserState } from './reducer';
import LoginComponent from './user/login.component';

function HomeComponent(props: any) {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);

    return (
        <div>
            { user.first ? (
                <div>
                    <br />
                Welcome, {user.first} {user.last}.
                    <br />
                    <Link to='/addClaim'>Create a new claim</Link>
                </div>
            ) : (
                    <div>
                        You are not logged in.
                        <Route exact path='/home' 
                        render={() => <Redirect to='/login'></Redirect>}/>
                    </div>
            )}
        </div>
    )
}

export default HomeComponent;
