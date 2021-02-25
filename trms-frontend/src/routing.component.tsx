import React from 'react';
import { Route, BrowserRouter, Link, useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import HomeComponent from './home.component';
import LoginComponent from './user/login.component';
import ClaimsListComponent from './claims/claimsList.component';
import ClaimsDetailComponent from './claims/claimsDetail.component';
import ClaimsDenialComponent from './claims/claimsDenial.component';
import ClaimsInfoComponent from './claims/claimsInfo.component';
import ClaimsEditComponent from './claims/editClaims.component';
import AddClaimComponent from './claims/addClaim.component';

import { getUser} from './actions';
import { UserState } from './reducer';
import {User} from './user/user';
import userService from './user/user.service';

import ErrorBoundaryComponent from './error.component';

export default function RouterComponent() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    function logout() {
        userService.logout().then(() => {
            dispatch(getUser(new User()));
        });
    }

    return (
        <BrowserRouter>
            <div>
                <header className="App-header">
                    <h1>
                        Tuition Reimbursement System
                    </h1>
                    <nav id='nav'>
                        <ul>
                            <li>
                                {user.first ? (
                                    <button className='link' onClick={logout}>
                                        Logout
                                    </button>
                                ) : (
                                        <Link to='/login'>Login</Link>
                                    )}
                            </li>

                            <li>
                                <Link to='/home'>Home</Link>
                            </li>
                            {user.first ? (
                                <li>
                                    <Link to='/claims'>Claims</Link>
                                </li>
                            ) : null}
                        </ul>
                    </nav>
                    <div id='claimForm'></div>
                </header>
                <ErrorBoundaryComponent>
                <Route
                    exact
                    path='/'
                    render={() => <Redirect to='/home'></Redirect>}
                />
                <Route path='/login' component={LoginComponent} />
                <Route path='/home' component={HomeComponent} />
                <Route exact path='/claims' component={ClaimsListComponent} />
                <Route exact path='/claims/:id' component={ClaimsDetailComponent} />
                <Route exact path='/claims/:id/denial' component={ClaimsDenialComponent} />
                <Route exact path='/claims/:id/info' component={ClaimsInfoComponent} />
                <Route exact path='/claims/:id/edit' component={ClaimsEditComponent} />
                <Route exact path='/addClaim' component={AddClaimComponent} />
                </ErrorBoundaryComponent>
            </div>
        </BrowserRouter>
    )
}
