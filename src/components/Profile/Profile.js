import React, { useState, useEffect } from 'react';
import AlertBox from './../AlertBox/AlertBox';
import { CodeForceTitleSection } from './../Miscellaneous/Miscellaneous.component';

const Profile = () => {

    const [alertObject, setAlertObject] = useState({
        showAlert: false,
        alertMsg: `Sample message`,
        alertType: "success"
    });

    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        yearOfStudy: "",
        json: true  
      })

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
                setAlertObject({
                    showAlert: true,
                    alertMsg: "Profile fetched successfully",
                    alertType: "success"
                });
                setProfile(data.profile);
                setFormState({...formState,
                    firstName: data.profile.firstName,
                    lastName: data.profile.lastName,
                    email: data.profile.contactEmail || data.profile.googleEmail,
                    yearOfStudy: data.profile.yearOfStudy,
                    discord: data.profile.discord,
                    nameConsent: data.profile.nameConsent
                });
            } else {
                setAlertObject({
                    showAlert: true,
                    alertMsg: "Failed to load profile",
                    alertType: "danger"
                });
                setProfile(null);
            }
        }));

        
        
    }
    const handleChange = (e, name) => {
        setFormState({
            ...formState,
            [name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formState);
        try{
            let res = await (await fetch("https://uwcodeforce.ca/api/myprofile/update", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formState)
            })
            ).json()
        if(res.status === "success"){
            setAlertObject({showAlert: true, alertMsg: "Your profile has been updated!", alertType: "success"});
        }else{
            setAlertObject({showAlert: true, alertMsg: "Profile failed to update. " + res.message, alertType: "danger"});
        }
        }catch(t){
            setAlertObject({showAlert: true, alertMsg: "Something weird happened. " + t.message, alertType: "danger"});
        }
    }
    return(
        <div className="container-fluid fullscreen intro">
            <CodeForceTitleSection/>
            <div className="row col-sm-4 col-centered mb-4">
                { alertObject.showAlert ? <AlertBox message={alertObject.alertMsg} type={alertObject.alertType}/> : " "}
            </div>
            <div className="row col-sm-8 col-centered text-center">
                <h2>Update Profile</h2> <small>You must update all information and submit before you can sign up for a challenge!</small>
                {profile ?<div className="row col-sm-8 col-centered">
                    <form onSubmit={(e)=>{handleSubmit(e)}}
                        autoComplete="off">
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label"><strong>First Name</strong></label>
                                <input required type="text" className="form-control" name="firstName" placeholder="John" value={formState.firstName} onChange={(e) => {handleChange(e, "firstName")}}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label"><strong>Last Name</strong></label>
                                <input required type="text" className="form-control" name="lastName" placeholder="Doe" value={formState.lastName} onChange={(e) => {handleChange(e, "lastName")}}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label"><strong>Email</strong></label>
                                <input required type="email" className="form-control" name="email" placeholder="someone@something.com" value={formState.email} onChange={(e) => {handleChange(e, "email")}}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="yearOfStudy" className="form-label"><strong>Year of Program</strong></label>
                                <input required type="number" className="form-control" name="yearOfStudy" placeholder="3" value={formState.yearOfStudy} onChange={(e) => {handleChange(e, "yearOfStudy")}}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="discord" className="form-label"><strong>Discord Tag <small>(optional)</small></strong></label>
                                <input type="text" className="form-control" name="yearOfStudy" placeholder="Someone#1234" value={formState.discord} onChange={(e) => {handleChange(e, "discord")}}/>
                            </div>
                            <div className="mb-3">
                                <input required type="checkbox" className="form-check-input" name="nameConsent" value={formState.nameConsent} onChange={(e) => {handleChange(e, "nameConsent")}}/>
                                <label htmlFor="nameConsent" className="form-label"><strong>I consent for the UW Code Force to share my name on this website and social media</strong></label>
                            </div>

                            <div className="mb-3">
                                <button
                                    className={"btn btn-dark m-auto d-block"}
                                    type="submit"
                                >Submit</button>
                            </div>
                        </form>
                </div> : "Profile failed to load..."}
                
            </div>
        </div>
    )
}

export default Profile;