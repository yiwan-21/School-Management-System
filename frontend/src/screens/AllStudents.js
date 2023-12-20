import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listStudents } from "../actions/studentActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { deleteStudent } from "../actions/studentActions";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Link } from 'react-router-dom'

const AllStudents = ({}) => {
  const dispatch = useDispatch();
  const studentList = useSelector((state) => state.studentList);
  const { loading, students, error } = studentList;
  const studentDelete = useSelector((state) => state.studentDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = studentDelete;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    dispatch(listStudents());
  }, [dispatch, successDelete]);

  useEffect(() => {
    if (searchClicked) {
      const filtered = students.filter((student) =>
        student.student_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [students, searchQuery, searchClicked]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteStudent(id));
    }
  };

  const navigateHandler = (id) => {};

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    setSearchClicked(true);
  };

  const resetFilterHandler = () => {
    setSearchQuery("");
    setSearchClicked(false);
    setFilteredStudents(students);
  };

  useEffect(() => {
    setFilteredStudents(students);
  }, [students]);

  var i = 1;

  return (
    <div className="container2">
      <form
        className="outer"
        style={{ display: "flex", justifyContent: "flex-end" }}
        onSubmit={searchSubmitHandler}
      >
        <input
          type="text"
          style={{ borderRadius: "10px", border: "1px solid grey" }}
          placeholder="Search for student..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-icon">
          <i className="fas fa-search"></i>
        </button>
        {searchClicked && (
          <button
            type="button"
            className="search-icon"
            onClick={resetFilterHandler}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </form>

      <div className="margin-top20">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger" message={error} />
        ) : (
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th>SN</Th>
                <Th>Photo</Th>
                <Th>Student Name</Th>
                <Th>Class</Th>
                <Th>Roll No</Th>
                <Th>Address</Th>
                <Th>Parent's Name</Th>
                <Th>Contact No</Th>
                <Th>Previous Dues</Th>
                <Th>Age</Th>
                <Th>Gender</Th>
                <Th>Action</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredStudents.map((data) => (
                <Tr key={data._id}>
                  <Td className="text-black font-bold">{i++}</Td>
                  <Td className="circle-image ">
                    <img
                      className="circle-image-inner"
                      src={data.image}
                      alt=""
                    />
                  </Td>
                  <Td className="text-black font-bold">{data.student_name}</Td>
                  <Td className="text-black font-bold">{data.classname}</Td>
                  <Td className="text-black font-bold">{data.roll_no}</Td>
                  <Td className="text-black font-bold">{data.address}</Td>
                  <Td className="text-black font-bold">{data.parents_name}</Td>
                  <Td className="text-black font-bold">{data.contact_no}</Td>
                  <Td className="text-black font-bold">{data.previous_dues}</Td>
                  <Td className="text-black font-bold">{data.age}</Td>
                  <Td className="text-black font-bold">{data.gender}</Td>
                  <Td>
                    <Link
                      className="linker"
                      to={`/student_details/details/edit/${data._id}`}
                    >
                      <i
                        style={{
                          padding: "8px",
                          color: "green",
                          fontSize: "25px",
                        }}
                        className="far fa-edit"
                      ></i>
                    </Link>
                  </Td>
                  <Td>
                    <i
                      style={{
                        padding: "8px",
                        color: "red",
                        cursor: "pointer",
                        fontSize: "25px",
                      }}
                      onClick={() => deleteHandler(data._id)}
                      className="fa fa-trash"
                    ></i>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AllStudents;