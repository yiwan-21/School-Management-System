import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  classlistStudent,
  studentAttendances,
} from "../actions/studentActions";
import { STUDENT_ATTENDANCE_RESET } from "../constants/studentConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";
import axios from "axios";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const StudentDeepAttendance = ({ match }) => {
  const matchid = match.params.class;
  const [attendanceList, setAttendanceList] = useState([]);
  const [present, setPresent] = useState({});
  const dispatch = useDispatch();
  const {
    loading: loadingAttendance,
    students: studentsAttendance,
    error: errorAttendance,
  } = useSelector((state) => state.studentAttendance);
  const {
    loading: loadingStudents,
    students: allStudentsData,
    error: errorStudents,
  } = useSelector((state) => state.studentClassList);

  useEffect(() => {
    const studentsAttend = async () => {
      axios
        .get(`/api/students/class/${matchid}/attendance`)
        .then((res) => setAttendanceList(res.data.students))
        .catch((err) => console.log(err.response.data.message));
    };
    studentsAttend();
    dispatch({
      type: STUDENT_ATTENDANCE_RESET,
    });
    dispatch(classlistStudent(matchid));
  }, [dispatch, matchid]);
  var i = 1;
  const submitAttendance = () => {
    attendanceList && allStudentsData &&
    allStudentsData.filter((student) => student.present === undefined)
      .forEach((student) => {
        const index = attendanceList.findIndex((s) => s._id === student._id);
        if (index !== -1) {
          student.present = attendanceList[index].present;
        }
      });
    dispatch(studentAttendances(matchid, allStudentsData));
  };
  const toggleAttendance = (id) => {
    if (attendanceList.length > 0) {
      let isPresent = attendanceList.filter((student) => student._id === id)[0]
        .present;
      setAttendanceList((prev) =>
        prev.map((student) => {
          if (student._id === id) {
            student.present = !isPresent;
          }
          return student;
        })
      );
      allStudentsData.filter((student) => student._id === id)[0].present = !isPresent;
      setPresent((prev) => ({
        ...prev,
        [id]: !isPresent,
      }));
    } else {
      allStudentsData.filter((student) => student._id === id)[0].present = !present[id];
      setPresent((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    }
  };

  return (
    <div className="bg-white px-28">
      <h1 className="text-center mt-5 mb-10 text-lg">
        Attendance for the date of &nbsp;
        <span className="font-semibold underline">
          {new Date().toLocaleDateString()}
        </span>{" "}
      </h1>
      {attendanceList.length > 0 && (
        <h3 className="text-center font-semibold bg-green-300 w-min whitespace-nowrap m-auto mb-6 p-3 rounded-sm">
          Attendance already taken for today
        </h3>
      )}
      {studentsAttendance && (
        <Message variant="success" message={studentsAttendance.message} />
      )}
      {errorAttendance && (
        <Message variant="danger" message={errorAttendance.message} />
      )}
      <br />
      {loadingAttendance && <Loader />}
      {loadingStudents ? (
        <Loader />
      ) : errorStudents ? (
        <Message variant="danger" message={errorStudents} />
      ) : (
        <Table variant="striped">
          <Thead className="py-2 bg-gray-50">
            <Tr className="text-center">
              <Th className="w-[10%]">SN</Th>
              <Th>Student</Th>
              <Th className="w-[20%]">Roll No</Th>
              <Th className="w-[20%]">Attendance</Th>
            </Tr>
          </Thead>
          <Tbody>
            {attendanceList.length > 0
              ? attendanceList.map((student) => (
                <Tr key={student._id} className="attendance">
                  <Td>{i++}</Td>
                  <Td>
                    <div className="flex items-center gap-4">
                      <img
                        src={student.image}
                        className="w-12 h-12 object-contain"
                      />
                      {student.student_name}
                    </div>
                  </Td>
                  <Td>{student.roll_no}</Td>
                  <Td
                    className={`cursor-pointer ${student.present ? "!bg-green-200" : "!bg-red-200"
                      }`}
                    onClick={() => toggleAttendance(student._id)}
                  >
                    {student.present ? "Present" : "Absent"}
                  </Td>
                </Tr>
              ))
              : allStudentsData &&
              allStudentsData.map((student) => (
                <Tr key={student._id} className="attendance">
                  <Td>{i++}</Td>
                  <Td>
                    <div className="flex items-center gap-4">
                      <img
                        src={student.image}
                        className="w-12 h-12 object-contain"
                      />
                      {student.student_name}
                    </div>
                  </Td>
                  <Td>{student.roll_no}</Td>
                  <Td
                    className={`cursor-pointer ${present[student._id] ? "!bg-green-200" : "!bg-red-200"
                      }`}
                    onClick={() => toggleAttendance(student._id)}
                  >
                    {present[student._id] ? "Present" : "Absent"}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      )}
      {allStudentsData && (
        <button
          onClick={submitAttendance}
          className={`block m-auto mt-4 text-white font-semibold py-2 px-4 rounded-md bg-green-500 hover:bg-green-600 cursor-pointer`}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default StudentDeepAttendance;
