import React from "react";
import PropTypes from "prop-types";

export default function AllPersons(props) {
  const { persons } = props;

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Age</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>{persons}</tbody>
      </table>
    </div>
  );
}

AllPersons.propTypes = {
  persons: PropTypes.array.isRequired,
  editPerson: PropTypes.func.isRequired,
  deletePerson: PropTypes.func.isRequired,
};
