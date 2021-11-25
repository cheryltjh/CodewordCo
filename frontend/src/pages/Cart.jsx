import React from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <div>
      View your cart!
      <Link to="/enroll" className="enroll">
        <button primary>Enroll now!</button>
      </Link>
    </div>
  );
}
