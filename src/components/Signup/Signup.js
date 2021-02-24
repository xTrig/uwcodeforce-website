import React, { useState, useEffect } from 'react';
import AlertBox from './../AlertBox/AlertBox';
import { CodeForceTitleSection } from './../Miscellaneous/Miscellaneous.component';

const Signup = () => {

    const [alertObject, setAlertObject] = useState({
        showAlert: false,
        alertMsg: `Sample message`,
        alertType: "success"
    });

    const [formState, setFormState] = useState({
        teamLeaderRole: false,
        developerRole: false,
        designerRole: false,
        git: "-1",
        collab: "",
        description: "",
        challenge: 2,
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
                setProfile(data.profile);
            } else {
                // setAlertObject({
                //     showAlert: true,
                //     alertMsg: "Failed to load profile",
                //     alertType: "danger"
                // });
                setProfile(null);
                window.location.href = "https://uwcodeforce.ca/api/auth";
            }
        }));
    }

    const handleChange = (e, name) => {
        setFormState({
            ...formState,
            [name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        })
    }

    const logState = (e) => {
        console.log(formState);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formState);
        try{
            let res = await (await fetch("https://uwcodeforce.ca/api/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formState)
            })
            ).json()
        if(res.status === "success"){
            setAlertObject({showAlert: true, alertMsg: "You have been signed up!", alertType: "success"});
        }else{
            setAlertObject({showAlert: true, alertMsg: "Failed to signup " + res.message, alertType: "danger"});
        }
        }catch(t){
            setAlertObject({showAlert: true, alertMsg: "Something weird happened. " + t.message, alertType: "danger"});
        }
        window.scrollTo(0,0); //Scroll to top of page
    }

    

    return(
        <div className="container-fluid fullscreen intro">
            <CodeForceTitleSection/>
            <div className="row col-sm-4 col-centered mb-4">
                { alertObject.showAlert ? <AlertBox message={alertObject.alertMsg} type={alertObject.alertType}/> : " "}
            </div>
            {profile ?<div className="row col-sm-8 col-centered">
                <h2 className="display-2">Challenge #2 Signup</h2>
                    <form onSubmit={(e)=>{handleSubmit(e)}}
                        autoComplete="off">
                            <b>Preferred Role</b>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" name="teamLeaderRole" checked={formState.teamLeaderRole} onChange={(e) => {handleChange(e, "teamLeaderRole")}}/>
                                <label htmlFor="teamLeaderRole" className="form-check-label"><strong>Team Leader</strong></label>
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" name="developerRole" checked={formState.developerRole} onChange={(e) => {handleChange(e, "developerRole")}}/>
                                <label htmlFor="developerRole" className="form-check-label"><strong>Developer</strong></label>
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" name="preferredRole" checked={formState.designerRole} onChange={(e) => {handleChange(e, "designerRole")}}/>
                                <label htmlFor="preferredRole" className="form-check-label"><strong>Designer/Analyst</strong></label>
                            </div>
                            <div className="mb-3 mt-3">
                                <strong>How familiar are you with Git or other version control software?</strong>
                                <select className="form-select" value={formState.git} onChange={(e) => {handleChange(e, "git")}}>
                                    <option selected value="-1">Select one...</option>
                                    <option value="veryfamiliar">Very Familiar (can teach others how to use it)</option>
                                    <option value="average">Average</option>
                                    <option value="belowaverage">Below Average</option>
                                    <option value="never">I've never used Git or other version control software</option>
                                </select>
                            </div>
                            <div className="mb-3">
                            <stong>If you have other team members you would like to work with, please list them below. **They must also fill out a sign up form**</stong>
                                <textarea className="form-control" rows="3" value={formState.collab} onChange={(e) => {handleChange(e, "collab")}}></textarea>
                            </div>
                            <div className="mb-3">
                                <stong>List some programming languages/frameworks you are comfortable with</stong>
                                <textarea className="form-control" rows="3" value={formState.description} onChange={(e) => {handleChange(e, "description")}}></textarea>
                            </div>
                            

                            <div className="mb-3">
                                <button
                                    className={"btn btn-dark m-auto d-block"}
                                    type="submit"
                                >Sign up</button>
                            </div>
                        </form>
                </div> : "Profile failed to load..."}
        </div>
    )
}

export default Signup;