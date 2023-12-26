import axios from "axios";
import {
  TEACHER_DELETE_FAIL,
  TEACHER_DELETE_REQUEST,
  TEACHER_DELETE_SUCCESS,
  TEACHER_LIST_FAIL,
  TEACHER_LIST_REQUEST,
  TEACHER_LIST_SUCCESS,
  TEACHER_REGISTER_FAIL,
  TEACHER_REGISTER_REQUEST,
  TEACHER_REGISTER_SUCCESS,
  TEACHER_SALARY_FAIL,
  TEACHER_SALARY_REQUEST,
  TEACHER_SALARY_SUCCESS,
  TEACHER_UPDATE_FAIL,
  TEACHER_UPDATE_REQUEST,
  TEACHER_UPDATE_SUCCESS,
  TEACHER_SEARCH_FAIL,
  TEACHER_SEARCH_REQUEST,
  TEACHER_SEARCH_SUCCESS,
  TEACHER_ATTENDANCE_REQUEST,
  TEACHER_ATTENDANCE_SUCCESS,
  TEACHER_ATTENDANCE_FAIL,
} from "../constants/teacherConstants";

export const PaySalary =
  (
    teachername,
    teacherid,

    salaryForTheYear,
    salaryForTheMonth,
    salaryAmount
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_SALARY_REQUEST,
      });
      const {
        userLogin: { userCred },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userCred.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/teachers/fees/${teachername}/${teacherid}`,
        {
          salaryForTheYear,
          salaryForTheMonth,
          salaryAmount,
        },
        config
      );
      dispatch({
        type: TEACHER_SALARY_SUCCESS,
        payload: data,
      });
      //we are getting  the json data from our backend request so we need to convert it into the
      //string before we save them in our local storage of our  browser
    } catch (error) {
      dispatch({
        type: TEACHER_SALARY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//TEACHER REGISTER

export const teacherregister =
  (
    teacher_name,

    qualification,

    address,

    contact_no,
    gender,
    previous_school,

    age,
    email,
    estimated_salary,
    image,
    subjectToTeach
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_REGISTER_REQUEST,
      });
      //we need to send headers information so we declaring it inside the config
      const {
        userLogin: { userCred },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userCred.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/teachers/register",
        {
          teacher_name,

          qualification,

          address,

          contact_no,
          gender,
          previous_school,

          age,
          email,
          estimated_salary,
          image,
          subjectToTeach,
        },
        config
      );
      dispatch({
        type: TEACHER_REGISTER_SUCCESS,
        payload: data,
      });
      //we are getting  the json data from our backend request so we need to convert it into the
      //string before we save them in our local storage of our  browser
    } catch (error) {
      dispatch({
        type: TEACHER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//FOLLOWING IS FOR GETTING TEACHER DETAIULS BY ID
export const getTeacherDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TEACHER_SEARCH_REQUEST,
    });
    const { data } = await axios.post(`/api/teachers/edit/${id}`);
    console.log("Data is ", data);
    dispatch({
      type: TEACHER_SEARCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEACHER_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//FOLLOWING IS FOR UPDATING THE Teacher
export const Update =
  (
    id,
    teacher_name,
    email,
    qualification,
    address,
    subjectToTeach,
    contact_no,
    previous_school,
    age,
    estimated_salary,
    image,
    gender
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_UPDATE_REQUEST,
      });
      const {
        userLogin: { userCred },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userCred.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/teachers/update/${id}`,
        {
          teacher_name,
          email,
          qualification,
          address,
          subjectToTeach,
          contact_no,
          previous_school,
          age,
          estimated_salary,
          image,
          gender,
        },
        config
      );
      dispatch({
        type: TEACHER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TEACHER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//FOLLOWING IS FOR DELETING THE Teacher

export const deleteTeacher = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TEACHER_DELETE_REQUEST,
    });
    const { data } = await axios.delete(`/api/teachers/delete/${id}`);
    dispatch({
      type: TEACHER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEACHER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//TEACHER all

export const listTeachers = () => async (dispatch) => {
  try {
    dispatch({
      type: TEACHER_LIST_REQUEST,
    });
    const { data } = await axios.get("/api/teachers");
    dispatch({
      type: TEACHER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEACHER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// TEACHER attendance
export const teacherAttendances = (teachers) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEACHER_ATTENDANCE_REQUEST,
    });
    //we need to send headers information so we declaring it inside the config
    const {
      userLogin: { userCred },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userCred.token}`,
      },
    };
    const { data } = await axios.post(
      '/api/teachers/attendance/',
      {
        teachers,
      },
      config
    );
    dispatch({
      type: TEACHER_ATTENDANCE_SUCCESS,
      payload: data,
    });
    //we are getting  the json data from our backend request so we need to convert it into the
    //string before we save them in our local storage of our  browser
  } catch (error) {
    dispatch({
      type: TEACHER_ATTENDANCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}
