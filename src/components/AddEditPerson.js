import React, { useState } from "react";

export default function AddEditPerson(props) {
  const [person, setPerson] = useState({ ...props.personToEdit });
  const [msg, setMsg] = useState("");

  /* Add the required changes to use Reacts "Controlled Component Pattern" 
     to handle inputs related to a person */
  const handleChange = (evt) => {
    setPerson({ ...person, [evt.target.id]: evt.target.value });
    props.storeFormData(person);
    setMsg("");
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let perform = false;
    //checks if all data has been typed
    if (!person.name.length > 0) {
      setMsg("name missing");
      perform = false;
    } else if (!person.email.length > 0) {
      setMsg("email is missing");
      perform = false;
    } else if (person.age === "") {
      setMsg("age is missing");
      perform = false;
    } else if (person.gender === "") {
      setMsg("choose gender");
      perform = false;
    } else {
      perform = true;
    }
    if (perform) {
      //calls addEditPerson for person with given data:

      props.addEditPerson(person);
      // clears the form:
      evt.target.reset();
      props.storeFormData(person);

      //clears data of person
      setPerson(props.newPerson);
      props.count();
    }
  };

  function setNameInPlaceHolder() {
    return props.personToEdit.id === ""
      ? "Enter Name"
      : props.personToEdit.name;
  }
  function setAgeInPlaceHolder() {
    return props.personToEdit.id === "" ? "Enter Age" : props.personToEdit.age;
  }
  function setEmailInPlaceHolder() {
    return props.personToEdit.id === ""
      ? "Enter email"
      : props.personToEdit.email;
  }

  return (
    <div>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="control-label col-sm-3">Id:</label>
          <div className="col-sm-9">
            <input
              onChange={handleChange}
              className="form-control"
              readOnly
              id="id"
              value={props.personToEdit.id}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="name">
            Name:
          </label>
          <div className="col-sm-9">
            <input
              onChange={handleChange}
              className="form-control"
              id="name"
              //placeholder="Enter Name"
              placeholder={setNameInPlaceHolder()}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="age">
            Age:
          </label>
          <div className="col-sm-9">
            <input
              onChange={handleChange}
              type="number"
              className="form-control"
              id="age"
              placeholder={setAgeInPlaceHolder()}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="email">
            Email:
          </label>
          <div className="col-sm-9">
            <input
              onChange={handleChange}
              type="email"
              className="form-control"
              id="email"
              placeholder={setEmailInPlaceHolder()}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="pwd">
            Gender:
          </label>
          <div className="col-sm-9">
            <select
              defaultValue="gender"
              onSelect={handleChange}
              onChange={handleChange}
              className="form-control"
              id="gender"
              placeholder="Enter Gender"
            >
              <option disabled>gender</option>
              <option value="male">male</option>
              <option onSelect={handleChange} value="female">
                female
              </option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              style={{ marginLeft: 5 }}
              type="button"
              className="btn btn-dark"
            >
              Cancel
            </button>
            {msg}
          </div>
        </div>
      </form>
    </div>
  );
}
