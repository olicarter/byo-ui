import React, {useEffect} from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_USER} from './TextInput.gql';
import {useAuth} from '../../contexts';

export const TextInput = () => {
    const {user: authUser} = useAuth();
    const {id: netlifyId} = authUser || {};
    const [getUser, {
            data : {
                allUsers
            } = {}
        }
    ] = useLazyQuery(GET_USER, {variables: {
            netlifyId
        }});
    useEffect(() => {
        if (netlifyId) 
            getUser();
        
    }, [netlifyId, getUser]);

    // debugger;
    return (<div>
        <div>
            <form>
                <h3>Personal Datails</h3>
                <div>
                    <label>Firstname</label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>Lastname</label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>Email</label>
                    <input type="text"></input>
                </div>
            </form>
        </div>
        <div>
            <form>
                <h3>Billing Address</h3>
                <div>
                    <label>Address</label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>Zip/Postal code</label>
                    <input type=""></input>
                </div>
                <div>
                    <label>Country</label>
                    <select>
                        <option>UK</option>
                    </select>
                    {/* will add a react package to handle this later */} </div>
            </form>
        </div>
        <div>
            <form>
                <h3>Delivery Address</h3>
                <div>
                    <label>Firstname</label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>Lastname</label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>Email</label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>Mobile Number</label>
                    <input type=""></input>
                </div>
                <div>
                    <label>Street name</label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>Apartment Number</label>
                    <input type=""></input>
                </div>
            </form>
        </div>
    </div>);
};
