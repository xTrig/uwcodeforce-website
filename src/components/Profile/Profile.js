import React, { useState, useEffect } from 'react';
import AlertBox from './../AlertBox/AlertBox';
import { CodeForceTitleSection } from './../Miscellaneous/Miscellaneous.component';

const Profile = () => {

    const [alertObject, setAlertObj] = useState({
        showAlert: false,
        alertMsg: `Sample message`,
        alertType: "success"
    });

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        let res = await fetch("https://uwcodeforce.ca/api/myprofile", {
            method: 'GET',
            credentials: 'include'
        });

        if(res.status === "success") {
            setAlertObj({
                showAlert: true,
                alertMsg: "Profile fetched successfully",
                alertType: "success"
            });
            console.log(res);
        } else {
            setAlertObj({
                showAlert: true,
                alertMsg: "Failed to load profile",
                alertType: "error"
            });
        }
    }
    return(
        <div className="container-fluid fullscreen intro">
            <CodeForceTitleSection/>
            <div className="row col-sm-4 col-centered mb-4">
                { alertObject.showAlert ? <AlertBox message={alertObject.alertMsg} type={alertObject.alertType}/> : " "}
            </div>
            <div className="row col-sm-8 col-centered">
                <h2>Profile will go here</h2>
            </div>
        </div>
    )
}

export default Profile;