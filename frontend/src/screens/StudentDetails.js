import React, { useState, useEffect } from "react";
import Classes from "../screens/classData";
import axios from "axios";
import ClassItems from "../components/ClassItems";

const StudentDetails = () => {
 
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClasses, setFilteredClasses] = useState(Classes);

  const searchSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim().toLowerCase();

    const filteredClasses = Classes.filter((classinfo) =>
      classinfo.classname.toLowerCase().includes(trimmedQuery)
    );

    setFilteredClasses(filteredClasses);
  };

  return (
    <div className="container2">
       <div className="outer" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <input
        type="text"
        style={{ borderRadius: '10px', border: '1px solid grey' }}
        placeholder="Search for student..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <span className="search-icon" onClick={searchSubmit}>
        <i className="fas fa-search"></i>
      </span>
    </div>
      <div className="classes outer">
        {filteredClasses.map((classinfo) => (
          <ClassItems
            key={classinfo._id}
            target={`/student_details/details/${classinfo.classname}`}
            classid={classinfo.classname}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentDetails;