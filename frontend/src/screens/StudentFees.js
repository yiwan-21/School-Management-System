import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import NepaliDate from "nepali-date-converter";
import { PayFees } from "../actions/studentActions";
import Loader from "../components/Loader";
import {
  STUDENT_FEES_RESET,
  STUDENT_SEARCH_CLEAR,
} from "../constants/studentConstants";
// import axios from 'axios'
import { studentSearch } from "../actions/studentActions";
import { Button, Input, Select } from "@chakra-ui/react";
const StudentFees = () => {
  const dispatch = useDispatch();
  const studentdetails = useSelector((state) => state.studentSearch);
  const { loading, students, error } = studentdetails;
  const [name, setName] = useState("");
  const [classname, setClassname] = useState("");
  const [ok, setOk] = useState(false);

  const [student, setStudent] = useState({});
  const [searched, setSearched] = useState(false);
  const [monthname, setMonthname] = useState("");

  const [year, setYear] = useState(new Date().getFullYear());
  const [monthlyfees, setMonthlyfees] = useState("");
  const [hostel_fees, setHostel_fees] = useState("");
  const [laboratory_fees, setLaboratory_fees] = useState("");
  const [computer_fees, setComputer_fees] = useState("");
  const [exam_fees, setExam_fees] = useState("");
  const [miscellaneous, setMiscellaneous] = useState("");
  const studentFees = useSelector((state) => state.studentFees);

  const {
    loading: loadingfees,
    error: errorfees,
    success: successfees,
  } = studentFees;
  const formSubmit = async (e) => {
    e.preventDefault();
    dispatch(studentSearch(name.trim(), classname, rollno));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setOk(true);

    dispatch(
      PayFees(
        student._id,
        student.student_name,

        student.classname,
        student.roll_no,
        monthname,
        new NepaliDate().format("YYYY"),
        monthlyfees,
        hostel_fees,
        laboratory_fees,
        computer_fees,
        exam_fees,
        miscellaneous
      )
    );
    setTimeout(() => {
      setOk(false);
    }, 10000);
    // setName('')
    // setClassname('')
    // setRollno('')
    // setMonthlyfees('')

    dispatch({
      type: STUDENT_SEARCH_CLEAR,
    });
  };
  useEffect(() => {
    dispatch({
      type: STUDENT_FEES_RESET,
      type: STUDENT_SEARCH_CLEAR,
    });
  }, [dispatch]);
  return (
    <div className="container1">
      <div className="search-form">
        <h4>Search for Student to pay fees</h4>

        <form onSubmit={formSubmit}>
          <input
            className="first-input"
            type="text"
            value={name}
            placeholder="Enter the name of student"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <select
            id="class"
            value={classname}
            onChange={(e) => setClassname(e.target.value)}
            required
          >
            <option value="">Select Class</option>
            <option value="Nursery">Nursery</option>
            <option value="LKG">LKG</option>
            <option value="UKG">UKG</option>
            <option value="One">One</option>
            <option value="Two">Two</option>
            <option value="Three">Three</option>
            <option value="Four">Four</option>
            <option value="Five">Five</option>
            <option value="Six">Six</option>
            <option value="Seven">Seven</option>
            <option value="Eight">Eight</option>
            <option value="Nine">Nine</option>
            <option value="Ten">Ten</option>
          </select>
          <input
            type="number"
            value={rollno}
            onChange={(e) => setRollno(e.target.value)}
            placeholder="Enter the roll no"
            required
          />
          <button className="btn-search" type="submit">
            Search
          </button>
        </form>
      </div>
      {ok && errorfees && <Message variant="danger" message={errorfees} />}
      {ok && successfees && (
        <Message variant="success" message={successfees.message} />
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" message={error} />
      ) : loadingfees ? (
        <Loader />
      ) : (
        student &&
        student.student_name && (
          <div className="outer-layout">
            <h1>Student Fees Section</h1>

            <form onSubmit={submitHandler}>
              <div className="form-inner">
                <div className="form-control">
                  <label for="name">Student Name</label>
                  <Input type="text" value={student.student_name} disabled />
                </div>
                <div className="form-control">
                  <label for="name">Class</label>
                  <Select id="class" value={student.classname} disabled>
                    <option value="">Select</option>

                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="One">One</option>
                    <option value="Two">Two</option>
                    <option value="Three">Three</option>
                    <option value="Four">Four</option>
                    <option value="Five">Five</option>
                    <option value="Six">Six</option>
                    <option value="Seven">Seven</option>
                    <option value="Eight">Eight</option>
                    <option value="Nine">Nine</option>
                    <option value="Ten">Ten</option>
                  </Select>
                </div>{" "}
                <div className="form-control">
                  <label for="name">Roll No</label>
                  <Input type="number" value={student.roll_no} disabled />
                </div>{" "}
                <div className="form-control">
                  <label for="year">Year</label>
                  <Input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>{" "}
                <div className="form-control">
                  <label for="name">Month</label>
                  <Select
                    id="class"
                    value={monthname}
                    onChange={(e) => setMonthname(e.target.value)}
                    required
                  >
                    <option value="">Select Month</option>
                    <option value="Baisakh">January</option>
                    <option value="Jestha">February</option>
                    <option value="Ashadh">March</option>
                    <option value="Shrawan">April</option>
                    <option value="Bhadra">May</option>
                    <option value="Ashoj">June</option>
                    <option value="Kartik">July</option>
                    <option value="Mangsir">August</option>
                    <option value="Poush">September</option>
                    <option value="Magh">October</option>
                    <option value="Falgun">November</option>
                    <option value="Chaitra">December</option>
                  </Select>
                </div>{" "}
                <div className="form-control">
                  <label for="name">Monthly Fees</label>
                  <Input
                    type="number"
                    value={monthlyfees}
                    onChange={(e) => setMonthlyfees(e.target.value)}
                    required
                  />
                </div>{" "}
                <div className="form-control">
                  <label for="name">Hostel Fees</label>
                  <Input
                    type="number"
                    value={hostel_fees}
                    onChange={(e) => setHostel_fees(e.target.value)}
                  />
                </div>{" "}
                <div className="form-control">
                  <label for="name">Laboratory Fees</label>
                  <Input
                    type="number"
                    value={laboratory_fees}
                    onChange={(e) => setLaboratory_fees(e.target.value)}
                  />
                </div>{" "}
                <div className="form-control">
                  <label for="name">Computer Fees</label>
                  <Input
                    type="number"
                    value={computer_fees}
                    onChange={(e) => setComputer_fees(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label for="name">Exam Fees</label>
                  <Input
                    type="number"
                    value={exam_fees}
                    onChange={(e) => setExam_fees(e.target.value)}
                  />
                </div>{" "}
                <div className="form-control">
                  <label for="name">Miscellaneous</label>
                  <Input
                    type="number"
                    value={miscellaneous}
                    onChange={(e) => setMiscellaneous(e.target.value)}
                  />
                </div>
              </div>

              <Button
                height={"auto"}
                className="btn-register"
                type="submit"
                colorScheme="whatsapp"
              >
                Pay Now
              </Button>
            </form>
          </div>
        )
      )}
    </div>
  );
};

export default StudentFees;