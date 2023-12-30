import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { FaSearch, FaTimes } from "react-icons/fa";

import Classes from "./classData";
import ClassItems from "../components/ClassItems";
const StudentAttendance = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClasses, setFilteredClasses] = useState(Classes);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();

    const filteredClasses = Classes.filter((classData) =>
      classData.classname.toLowerCase().includes(trimmedQuery)
    );

    setFilteredClasses(filteredClasses);
  }, [searchQuery]);

  return (
    // chakra ui
    <Box>
      <Box display="flex" justifyContent="flex-end" className="m-3">
        <input
          ref={searchInputRef}
          type="text"
          className="p-2 rounded-[10px] border border-gray-500"
          placeholder="Search for class..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery.trim().length > 0 ? (
          <div
            className="p-3 cursor-pointer"
            onClick={() => setSearchQuery("")}
          >
            <FaTimes />
          </div>
        ) : (
          <div
            className="p-3 cursor-pointer"
            onClick={() => searchInputRef.current.focus()}
          >
            <FaSearch />
          </div>
        )}
      </Box>
      <Box display="flex" justifyContent="center">
        <Box
          display="grid"
          width={{ base: "100%", md: "80%" }}
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          columnGap={5}
          rowGap={10}
        >
          {filteredClasses.map((classinfo) => (
            <ClassItems
              key={classinfo._id}
              target={`/student-attendance/${classinfo.classname}`}
              classid={classinfo.classname}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default StudentAttendance;
