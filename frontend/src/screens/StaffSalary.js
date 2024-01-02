import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listStaffs, PaySalary } from "../actions/staffActions";
import { STAFF_SALARY_RESET } from "../constants/staffConstants";
import { Button, Input } from "@chakra-ui/react";
import Select from "react-select";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./Student.css";

const StaffSalary = ({ history }) => {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [staffname, setStaffname] = useState("");
  const [id, setId] = useState("");
  const [valid, setValid] = useState(false);
  const [year, setYear] = useState("");
  const [salary, setSalary] = useState("");
  const [month, setMonth] = useState(null);
  const [selectedStaffError, setSelectedStaffError] = useState(false);
  const [monthError, setMonthError] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  // const userLogin = useSelector((state) => state.userLogin)

  const { userCred } = userLogin;

  // const studentRegister = useSelector((state) => state.studentRegister)
  const staffSalary = useSelector((state) => state.staffSalary);
  const { loading: loadingSalary, success, error } = staffSalary;

  const staffList = useSelector((state) => state.staffList);
  const { loading: loadingStaff, staffs } = staffList;

  const staffOptions = staffs.map((staff) => ({
    value: staff.staffId,
    label: staff.staff_name,
  }));

  const monthOptions = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  useEffect(() => {
    dispatch(listStaffs());
    dispatch({ type: STAFF_SALARY_RESET });
    if (!userCred) {
      history.push("/login");
    }
  }, [userCred, history]);

  useEffect(() => {
    if (selectedStaff) {
      setId(selectedStaff.value);
      setStaffname(selectedStaff.label);
    }
  }, [selectedStaff]);

  useEffect(() => {
    let timer;
    if (valid) {
      timer = setTimeout(() => {
        setValid(false);
      }, 10000);
    }
  
    return () => clearTimeout(timer);
  }, [valid]);

  const submitHandler = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!selectedStaff) {
      setSelectedStaffError(true);
      isValid = false;
    } else {
      setSelectedStaffError(false);
    }

    if (!month) {
      setMonthError(true);
      isValid = false;
    } else {
      setMonthError(false);
    }

    if (isValid) {
      dispatch(PaySalary(staffname.trim(), id, year, month.value, salary));
      setSelectedStaff(null);
      setStaffname("");
      setId("");
      setYear("");
      setSalary("");
      setMonth(null);
      setValid(true);
    }
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedStaff(selectedOption);
    setId(selectedOption.value);
    setStaffname(selectedOption.label);

    const selectedStaffData = staffs.find(
      (staff) => staff.staffId === selectedOption.value
    );

    if (selectedStaffData && selectedStaffData.estimated_salary) {
      setSalary(selectedStaffData.estimated_salary.toString());
    }
  };

  return (
    <div className="container1" style={{ marginTop: "10px" }}>
      <div className="outer-layout">
        <h1>Staff Salary Section</h1>
        {valid && success && (
          <Message variant="success" message={success.message} />
        )}
        {valid && error && <Message variant="danger" message={error} />}
        {monthError && <Message variant="danger" message={"Month is required"} />}
        {selectedStaffError && <Message variant="danger" message={"Staff name is required"} />}

        {loadingStaff ? (
          <Loader />
        ) : (
          <form onSubmit={submitHandler}>
            <div className="form-inner">
              <div className="form-control">
                {/* Searchable Staff selection dropdown */}
                <label htmlFor="staff">Select Staff</label>
                <Select
                  options={staffOptions}
                  onChange={handleSelectChange}
                  value={selectedStaff}
                  isSearchable
                  placeholder="Select Staff"
                />
              </div>
              <div className="form-control">
                <label for="name">Staff ID</label>
                <Input
                  type="number"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  readOnly
                  required
                />
              </div>
              <div className="form-control">
                <label for="year">Salary for Year</label>
                <Input
                  type="string"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label for="month">Salary for Month</label>
                <Select
                  options={monthOptions}
                  onChange={(selectedOption) => setMonth(selectedOption)}
                  isSearchable={false}
                  placeholder="Select Month"
                  value={month}
                />
              </div>
              <div className="form-control">
                <label for="name">Salary Amount</label>
                <Input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  required
                />
              </div>
              {/* <div className="register-btn"> */}
              {/* </div> */}
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
        )}
      </div>
    </div>
  );
};

export default StaffSalary;
