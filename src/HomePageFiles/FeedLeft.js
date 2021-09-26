import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { deleteFromStorage } from '../HelperClasses/StorageHandler';
import { matchRequest } from '../BackendRequests/Matches';
import { useEffect, useState } from 'react';

export default function FeedLeft({ setUser, user }) {
    let history = useHistory();
    const [fetchedMatches, setFechedMatches] = useState([]);
    const [error, setError] = useState(false);

    // handles user logout
    const handleLogout = () => {
        deleteFromStorage('user');
        setUser(null);
        history.push('/');
    }

    useEffect(()=>{
        const userMatches = async() =>{
            const data =  await matchRequest(user[0].username);
            setFechedMatches(data);
        };
        userMatches();
    }, [user]);

    const matches = fetchedMatches.matchedWith;
    const numberofMatches = matches.length;
    console.log(numberofMatches);
    console.log(matches);

    function showMatches(){
        
        var list = []
        for(var i = 0; i<numberofMatches ;i++){
            var picture;
            var name;
            try{
                picture = matches[i].Profile_Picture;
                if(picture === undefined){
                    picture = "";
                }
                name = matches[i].Full_Name;
                if(name === undefined){
                    name = "Error undefined name";
                }
            }catch(error){
                setError(true);
            }
               list.push(
                   <div className = "userTab">
                        <div className = "profilepicture"><img src = {picture} alt="" /> </div>
                        <div className = "userName">{name}</div>
                        <div className = "date"> 15 sept </div>
                   </div> 
               );
        }
        return list;
        
    }
    

    return (        
        <div>
            <div className="panel-container-1">
                <div className="panel-container-2">
                    <div className="profile-container">
                        <div className="profile-image" id="feed-image"></div>
                        <div className="profile-name">
                            <p id="feed-username">Username</p>                          
                        </div>
                    </div>

                    <div id="logout"><i class="uil uil-sign-out-alt"></i></div>
                </div>
                
                <div className="navbar-items">
                    <p>Matches</p>
                </div>
                <div>
                    {showMatches()}
                </div>
            </div>
        </div>
    )
}
