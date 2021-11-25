import React from 'react';
import { Link } from "react-router-dom";

export default function SuccessPage() {
    return (
        <div>
            Enrollment Success!
            <Link to="/">
              <button primary>Back to home</button>
            </Link>
        </div>
    )
}
