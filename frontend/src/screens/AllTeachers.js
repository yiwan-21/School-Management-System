import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTeachers } from "../actions/teacherActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { deleteTeacher } from "../actions/teacherActions";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Link } from 'react-router-dom'

const AllTeachers = ({}) => {
  const dispatch = useDispatch();
  const teacherList = useSelector((state) => state.teacherList);
  const { loading, teachers, error } = teacherList;
  const teacherDelete = useSelector((state) => state.teacherDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = teacherDelete;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);
  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    dispatch(listTeachers());
  }, [dispatch, successDelete]);

  useEffect(() => {
    if (searchClicked) {
      const filtered = teachers.filter((teacher) =>
        teacher.teacher_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTeachers(filtered);
    }
  }, [teachers, searchQuery, searchClicked]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTeacher(id));
    }
  };
  var i = 1;

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    setSearchClicked(true);
  };

  const resetFilterHandler = () => {
    setSearchQuery("");
    setSearchClicked(false);
    setFilteredTeachers(teachers);
  };

  useEffect(() => {
    setFilteredTeachers(teachers);
  }, [teachers]);

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
          placeholder="Search for teacher..."
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
                <Th>Teacher Name</Th>
                <Th>Qualification</Th>
                <Th>Teacher Id</Th>
                <Th>Address</Th>
                <Th>Subject To Teach</Th>
                <Th>Contact No</Th>
                <Th>Previous School</Th>
                <Th>Age</Th>
                <Th>Salary</Th>
                <Th>Gender</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredTeachers.map((data) => (
                <Tr key={data._id}>
                  <Td className="text-black font-bold">{i++}</Td>
                  <Td className="circle-image ">
                    <img
                      className="circle-image-inner"
                      src={data.image}
                      alt=""
                    />
                  </Td>
                  <Td className="text-black font-bold">{data.teacher_name}</Td>
                  <Td className="text-black font-bold">{data.qualification}</Td>
                  <Td className="text-black font-bold">{data.teacherId}</Td>
                  <Td className="text-black font-bold">{data.address}</Td>
                  <Td className="text-black font-bold">
                    {data.subjectToTeach}
                  </Td>
                  <Td className="text-black font-bold">{data.contact_no}</Td>
                  <Td className="text-black font-bold">
                    {data.previous_school}
                  </Td>
                  <Td className="text-black font-bold">{data.age}</Td>
                  <Td className="text-black font-bold">
                    {data.estimated_salary}
                  </Td>
                  <Td className="text-black font-bold">{data.gender}</Td>
                  <Td>
                    <Link
                      className="linker"
                      to={`/teacher_details/details/edit/${data._id}`}
                    >
                      <i
                        style={{
                          padding: "8px",
                          color: "green",
                          fontSize: "25px",
                        }}
                        className="fas fa-user-edit"
                      ></i>
                    </Link>
                  </Td>
                  <Td>
                    <i
                      style={{
                        padding: "8px",
                        color: "red",
                        fontSize: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteHandler(data.teacherId)}
                      className="fas fa-trash"
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

export default AllTeachers;