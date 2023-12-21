import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listStaffs } from "../actions/staffActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { deleteStaff } from "../actions/staffActions";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Link } from 'react-router-dom'

const AllStaffs = ({}) => {
  const dispatch = useDispatch();
  const staffList = useSelector((state) => state.staffList);
  const { loading, staffs, error } = staffList;
  const staffDelete = useSelector((state) => state.staffDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = staffDelete;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStaffs, setFilteredStaffs] = useState(staffs);
  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    dispatch(listStaffs());
  }, [dispatch, successDelete]);

  useEffect(() => {
    if (searchClicked) {
      const filtered = staffs.filter((staff) =>
        staff.staff_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStaffs(filtered);
    }
  }, [staffs, searchQuery, searchClicked]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteStaff(id));
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    setSearchClicked(true);
  };

  const resetFilterHandler = () => {
    setSearchQuery("");
    setSearchClicked(false);
    setFilteredStaffs(staffs);
  };

  useEffect(() => {
    setFilteredStaffs(staffs);
  }, [staffs]);

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
          placeholder="Search for staff..."
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
                <Th>Staff Name</Th>
                <Th>Qualification</Th>
                <Th>Staff Id</Th>
                <Th>Address</Th>
                <Th>Work</Th>
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
              {filteredStaffs.map((data) => (
                <Tr key={data._id}>
                  <Td className="text-black font-bold">{i++}</Td>
                  <Td className="circle-image ">
                    <img
                      className="circle-image-inner"
                      src={data.image}
                      alt=""
                    />
                  </Td>
                  <Td className="text-black font-bold">{data.staff_name}</Td>
                  <Td className="text-black font-bold">{data.qualification}</Td>
                  <Td className="text-black font-bold">{data.staffId}</Td>
                  <Td className="text-black font-bold">{data.address}</Td>
                  <Td className="text-black font-bold">{data.work}</Td>
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
                      to={`/non-teaching_staff_details/details/edit/${data._id}`}
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
                      onClick={() => deleteHandler(data.staffId)}
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

export default AllStaffs;