import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listTeachers, teacherAttendances } from '../actions/teacherActions'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { TEACHER_ATTENDANCE_RESET } from '../constants/teacherConstants'

function TeacherAttendance() {
  const [attendanceList, setAttendanceList] = useState([])
  const [present, setPresent] = useState({})
  const dispatch = useDispatch()
  const {
    loading: loadingAttendance,
    teachers: teachersAttendance,
    error: errorAttendance,
  } = useSelector((state) => state.teacherAttendance)
  const { 
    loading: loadingTeachers,
    teachers: allTeachersData,
    error: errorTeachers,
  } = useSelector((state) => state.teacherList)
  const allTeachers = allTeachersData && [...allTeachersData]

  useEffect(() => {
    // const teachersAttend = async () => {
    //   axios.get(
    //     // `/api/teachers/attendance`
    //   )
    //   .then((res) => setAttendanceList(res.data.teachers))
    //   .catch((err) => console.log(err.response.data.message))
    // }
    // teachersAttend()
    dispatch({
      type: TEACHER_ATTENDANCE_RESET,
    })
    dispatch(listTeachers())
  }, [dispatch])

  var i = 1
  const submitAttendance = () => {
    dispatch(teacherAttendances(allTeachersData))
  }
  const toggleAttendance = (id) => {
    if (attendanceList.length > 0) {
      let isPresent = attendanceList.filter((teacher) => teacher._id === id)[0].present
      setAttendanceList((prev) => 
        prev.map((teacher) => {
          if (teacher._id === id) {
            teacher.present = !isPresent
          }
          return teacher
        })
      )
      setPresent((prev) => ({
        ...prev,
        [id]: !isPresent,
      }))
    } else {
      setPresent((prev) => ({
        ...prev,
        [id]: !prev[id],
      }))
    }
    const new_teachers = allTeachers.filter((teacher) => teacher._id === id)
    new_teachers[0].present = !present[id]
  }

  return (
    <div className='bg-white px-28'>
      <h1 className='text-center mt-5 mb-10 text-lg'>
        Attendance for the date of &nbsp;
        <span className='font-semibold underline'>
          {new Date().toLocaleDateString()}
        </span>{' '}
      </h1>
      {attendanceList.length > 0 && (
        <h3 className='text-center font-semibold bg-green-300 w-min whitespace-nowrap m-auto mb-6 p-3 rounded-sm'>
          Attendance already taken for today
        </h3>
      )}
      {teachersAttendance && (
        <Message variant='success' message={teachersAttendance.message} />
      )}
      {errorAttendance && (
        <Message variant='danger' message={errorAttendance.message} />
      )}
      <br />
      {loadingAttendance && <Loader />}
      {loadingTeachers 
        ? <Loader />
        : errorTeachers 
          ? <Message variant='danger' message={errorTeachers} />
          : <Table variant='striped'>
              <Thead className='py-2 bg-gray-50'>
                <Tr className='text-center'>
                  <Th>SN</Th>
                  <Th>Teacher</Th>
                  <Th>Attendance</Th>
                </Tr>
              </Thead>
              <Tbody>
                {attendanceList.length > 0
                  ? attendanceList.map((teacher) => (
                      <Tr key={teacher._id} className='attendance'>
                        <Td>{i++}</Td>
                        <Td>
                          <div className='flex items-center gap-4'>
                            <img src={teacher.image} className='w-12 h-12 object-contain'/>
                            {teacher.teacher_name}
                          </div>
                        </Td>
                        <Td 
                          className={`cursor-pointer ${teacher.present ? '!bg-green-200' : '!bg-red-200'}`}
                          onClick={() => toggleAttendance(teacher._id)}
                        >
                          {teacher.present ? 'Present' : 'Absent'}
                        </Td>
                      </Tr>
                    ))
                  : allTeachers &&
                    allTeachers.map((teacher) => (
                      <Tr key={teacher._id} className='attendance'>
                        <Td>{i++}</Td>
                        <Td>
                          <div className='flex items-center gap-4'>
                            <img src={teacher.image} className='w-12 h-12 object-contain'/>
                            {teacher.teacher_name}
                          </div>
                        </Td>
                        <Td 
                          className={`cursor-pointer ${present[teacher._id] ? '!bg-green-200' : '!bg-red-200'}`}
                          onClick={() => toggleAttendance(teacher._id)}
                        >
                          {present[teacher._id] ? 'Present' : 'Absent'}
                        </Td>
                      </Tr>
                    ))}
              </Tbody>
            </Table>
      }
      {allTeachers && (
        <button
          onClick={submitAttendance}
          className={`block m-auto mt-4 text-white font-semibold py-2 px-4 rounded-md bg-green-500 hover:bg-green-600 cursor-pointer`}
        >
          Submit
        </button>
      )}
    </div>
  )
}

export default TeacherAttendance