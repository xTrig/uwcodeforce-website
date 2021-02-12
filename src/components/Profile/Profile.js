import React, { useState, useEffect } from 'react';
import AlertBox from './../AlertBox/AlertBox';
import { CodeForceTitleSection } from './../Miscellaneous/Miscellaneous.component';

const Profile = () => {

    const [alertObject, setAlertObj] = useState({
        showAlert: false,
        alertMsg: `Sample message`,
        alertType: "success"
    });

    const [profile, setProfile] = useState();

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        fetch("https://uwcodeforce.ca/api/myprofile", {
            method: 'GET',
            credentials: 'include'
        }).then((res) => res.json().then((data) => {
            if(data.status === "success") {
                setAlertObj({
                    showAlert: true,
                    alertMsg: "Profile fetched successfully",
                    alertType: "success"
                });
                setProfile(data.profile);
            } else {
                setAlertObj({
                    showAlert: true,
                    alertMsg: "Failed to load profile",
                    alertType: "error"
                });
                setProfile(null);
            }
        }));

        
    }
    return(
        <div className="container-fluid fullscreen intro">
            <CodeForceTitleSection/>
            <div className="row col-sm-4 col-centered mb-4">
                { alertObject.showAlert ? <AlertBox message={alertObject.alertMsg} type={alertObject.alertType}/> : " "}
            </div>
            <div className="row col-sm-8 col-centered">
                <h2>Profile will go here</h2>
                {profile ? <div>
                    <h3>First Name: {profile?.firstName}</h3>
                <h3>Last Name: {profile?.lastName}</h3>
                </div> : ""}
                
            </div>
        </div>
    )
}

export default Profile;