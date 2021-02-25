import { SyntheticEvent } from 'react';
import userService from './user.service';
import { useHistory } from 'react-router-dom';
import { UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, getUser} from '../actions';

//import {User} from './user';

function LoginComponent() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const history = useHistory();

    function handleFormInput(e: SyntheticEvent) {
        let u: any = { ...user };
        //console.log(u);
        console.log((e.target as HTMLInputElement).name);
        if((e.target as HTMLInputElement).name === 'username'){
            u.username = (e.target as HTMLInputElement).value;
        } else {
            u.password = (e.target as HTMLInputElement).value;
        }
        dispatch(loginAction(u));
        dispatch(getUser(u));
    }

    function submitForm() {
        userService.login(user).then((user) => {
            dispatch(getUser(user));
            history.push('/Home');
        });
    }
    return (
        <div className='formContainer'>
            <div className='form'>
                Username: <input type='text' className='form-control' onChange={handleFormInput} name='username'/>
                <br/>
                Password: <input type='password' className='form-control' onChange={handleFormInput} name='password'/>
                <br/>
                <button className='btn btn-danger' onClick={submitForm}>Login</button>
            </div>

        </div>
    );

}

export default LoginComponent;
