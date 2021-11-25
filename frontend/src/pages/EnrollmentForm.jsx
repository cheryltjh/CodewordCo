import React from 'react';
import { Link } from "react-router-dom";

export default function EnrollmentForm() {
    return (
        <div>
            Enrollment Form:
            Please fill in your details
            <Link to="/success" className="success">
              <button primary>Submit</button>
            </Link>
        </div>
    )
}
