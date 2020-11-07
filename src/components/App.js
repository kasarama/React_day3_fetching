import React, { useState, useEffect } from "react";
import AddEditPerson from "./AddEditPerson";
import AllPersons from "./AllPersons";

function App({ apiFacade }) {
  const emptyPerson = { id: "", age: "", name: "", email: "", gender: "" };
  const addNewHeader = "Add New Person";
  const [personToEdit, setPersonToEdit] = useState(emptyPerson);
  const [persons, setPersons] = useState([]);
  const [formData, setFormData] = useState(emptyPerson);
  const [headerAddEdit, setHeader] = useState(addNewHeader);
  const [counter, setCounter] = useState(0);

  const count = () => {
    setCounter(counter + 1);
    console.log("counter: " + counter);
  };
  const renderPeople = () => {
    apiFacade.getPersons((data) => {
      console.log("DATA in rendering:", data);
      setPersons(
        data.map((person) => (
          <tr key={person.id}>
            <th>{person.age}</th>
            <th>{person.name}</th>
            <th>{person.gender}</th>
            <th>{person.email}</th>
            <th>
              <button
                type="button"
                value={person.id}
                onClick={(e) => {
                  e.preventDefault();
                  editPerson(person);
                }}
              >
                edit
              </button>
              {"  "}/{" "}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deletePerson(person.id);
                }}
              >
                delete
              </button>
            </th>
          </tr>
        ))
      );
    });
  };
  useEffect(() => {
    renderPeople();
  }, [counter]);

  const storeFormData = (person) => {
    setFormData(person);
    //Call this from the AddEditPerson control with the person to Add or Edit and Add/Edit via the apiFacade
  };

  const deletePerson = (id) => {
    //Call this from the AllPerson control with the id for the person to delete
    apiFacade.deletePerson(id);
    renderPeople();
  };

  const editPerson = (person) => {
    setHeader("Edit Person");
    setPersonToEdit(person);

    //Call thisfrom the AllPerson control with the  person to edit
    //Set the state variable personToAddEdit with this person (a clone) to make the new value flow down via props
  };
  const addEditPerson = (person) => {
    apiFacade.addEditPerson(person, (data) => setFormData(emptyPerson));
    setHeader(addNewHeader);
    setPersonToEdit(emptyPerson);
  };

  return (
    <div className="container">
      <div className="row">
        <h3>CRUD Demo </h3>
        <div className="col-md-7">
          <h3>All Persons</h3>
          <AllPersons
            persons={persons}
            editPerson={editPerson}
            deletePerson={deletePerson}
          />
        </div>
        <div className="col-md-5">
          <h3 style={{ textAlign: "center" }}>{headerAddEdit}</h3>
          <AddEditPerson
            newPerson={emptyPerson}
            // Next two lines, are if you decide to use the pattern introduced in the day-2 exercises
            storeFormData={storeFormData}
            addEditPerson={addEditPerson}
            renderPeople={renderPeople}
            personToEdit={personToEdit}
            count={count}
            key={personToEdit.id}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-7">
          <p>
            single source of truth: {formData.name}, {formData.gender},
            {formData.email}, {formData.id}, {formData.age}
          </p>
        </div>
      </div>
    </div>
  );
}
export default App;
