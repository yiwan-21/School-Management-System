//this is the most important file for using the redux as state management tool
//this file should be created directly in the frontend folder
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { studentListReducer } from "./reducers/studentReducers";
import { userLoginReducer } from "./reducers/userReducers";
import {
  studentClassListReducer,
  studentSearchReducer,
  studentRegisterReducer,
  studentUpdateReducer,
  studentDeleteReducer,
  studentAttendanceReducer,
  studentFeesReducer,
  studentDetailsReducer,
} from "./reducers/studentReducers";
import {
  allIncomeReducer,
  allSalaryReducer,
} from "./reducers/miscellaneousReducers";
import {
  teacherSalaryReducer,
  teacherRegisterReducer,
  teacherDeleteReducer,
  teacherListReducer,
  teacherDetailsReducer,
  teacherUpdateReducer,
  teacherAttendanceReducer,
} from "./reducers/teacherReducers";
import {
  staffSalaryReducer,
  staffRegisterReducer,
  staffDeleteReducer,
  staffListReducer,
  staffDetailsReducer,
  staffUpdateReducer,
  staffAttendanceReducer,
} from "./reducers/staffReducers";
const reducer = combineReducers({
  studentList: studentListReducer,
  studentDetails: studentDetailsReducer,
  studentUpdate: studentUpdateReducer,
  studentClassList: studentClassListReducer,
  studentSearch: studentSearchReducer,
  userLogin: userLoginReducer,
  studentRegister: studentRegisterReducer,
  studentDelete: studentDeleteReducer,
  studentAttendance: studentAttendanceReducer,
  studentFees: studentFeesReducer,
  teacherSalary: teacherSalaryReducer,
  teacherRegister: teacherRegisterReducer,
  teacherDelete: teacherDeleteReducer,
  teacherList: teacherListReducer,
  teacherDetails: teacherDetailsReducer,
  teacherUpdate: teacherUpdateReducer,
  teacherAttendance: teacherAttendanceReducer,
  staffSalary: staffSalaryReducer,
  staffRegister: staffRegisterReducer,
  staffDelete: staffDeleteReducer,
  staffList: staffListReducer,
  staffDetails: staffDetailsReducer,
  staffUpdate: staffUpdateReducer,
  staffAttendance: staffAttendanceReducer,
  allIncome: allIncomeReducer,
  allSalary: allSalaryReducer,
});
const userInfoFromStorage = localStorage.getItem("userCred")
  ? JSON.parse(localStorage.getItem("userCred"))
  : null;

//remember the above should be null
const initialState = {
  userLogin: { userCred: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
