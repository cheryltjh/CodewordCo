import React from 'react';
import { Link } from 'react-router-dom';

export default function SuccessPage() {
    return (
        <div>
            Enrollment success!
            Thanks for enrolling with us. A staff will be in contact with you shortly about the enrollment details.
            <Link to="/" className="home">
              <button>Back to home</button>
            </Link>
        </div>
    )
}
