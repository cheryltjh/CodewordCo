import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function Dashboard({ role }) {
  // For the enrollment data
  const [enrolls, setEnrolls] = useState([]);
  let history = useHistory();
  // useeffect to get the enrolls data on render
  useEffect(() => {
    async function getEnrollsData() {
      await axios.get(`/api/enroll/`).then((enroll) => {
        setEnrolls(enroll.data.data);
      });
    }
    getEnrollsData();
  }, []);

  const deleteEnroll = (id) => {
    axios.delete(`/api/enroll/${id}`);
    window.alert(`Enrollment deleted`);
    setEnrolls(enrolls.filter((enroll) => enroll._id !== id));
  };

  const updateEnroll = (id) => {
    history.push(`/enrolls/edit/${id}`);
  };

  return (
    <>
      <h1>Admin Dashboard</h1>
      {/* Only allow admin to view dashboard */}
      {enrolls.map((element) => {
        return (
          <>
            <div class="enrolls">
              <p key={element._id} />
              <Link to={`/enrolls/${element._id}`}>
              </Link>
              {element.name}
              {element.phone}
              {element.email}
              {element.dateOfBirth}
              {element.product}
              {role === "Admin" && (
                <>
                  <Link onClick={() => updateEnroll(element._id)}>
                    Update
                  </Link>
                  <Link onClick={() => deleteEnroll(element._id)}>
                    X
                  </Link>
                </>
              )}
            </div>
          </>
        );
      })}
    </>
  );
}

export default Dashboard;
