import React, { useState } from 'react';
import AlertBox from './../AlertBox/AlertBox';
import { CodeForceTitleSection } from './../Miscellaneous/Miscellaneous.component';


const TestPage = () => {

    const [alertObject, setAlertObject] = useState({
        showAlert: false,
        alertMsg: `Sample message`,
        alertType: "success"
    })

    const btnClick = (e) => {
        e.preventDefault();
        fetch("https://uwcodeforce.ca/api/session", {
            method: 'GET',
            credentials: 'include'
        }).then((response) => response.json()).then((json) => {
            setAlertObject({
                showAlert: true,
                alertMsg: json.sessionVal,
                alertType: "success"
            });
        });
    }

    return(
        <div className="container-fluid pt-0 fullscreen intro">
            <CodeForceTitleSection />
            <div className="row mb-4">
                { alertObject.showAlert ? <AlertBox message={alertObject.alertMsg} type={alertObject.alertType}/> : " "}
            </div>
            <button onClick={btnClick} className="btn btn-primary">Test Req</button>
        </div>
    );
}

export default TestPage;