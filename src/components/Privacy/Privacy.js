import React from 'react';
import AlertBox from './../AlertBox/AlertBox';
import { CodeForceTitleSection } from './../Miscellaneous/Miscellaneous.component';


const Privacy = () => {
    return(
        <div className="container-fluid fullscreen intro">
            <CodeForceTitleSection/>
            <div className="col-sm-8 col-centered text-center">
                <h3>Privacy Policy</h3>
                <b>What we collect</b>
                <p><i>Your Google Id and Email:</i> For authentication purposes.</p>
                <p><i>Your First and Last Name:</i> We collect your first and last name from your Google account to speed up the registration process. This data can be changed when you sign up.</p>
                <p><i>Your contact email:</i> An email address different from your Google account email, if you prefer a different address to be contacted from.</p>
                <p className="mt-3"><b>Who we share this information with</b></p>
                <p>We do not share this information with anybody outside of the UW Code Force team.</p>
            </div>
        </div>
    )
}
export default Privacy;