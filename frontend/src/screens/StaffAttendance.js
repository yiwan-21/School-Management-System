import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listStaffs, staffAttendances } from '../actions/staffActions'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { STAFF_ATTENDANCE_RESET } from '../constants/staffConstants'

function StaffAttendance() {
  const [attendanceList, setAttendanceList] = useState([])
  const [present, setPresent] = useState({})
  const dispatch = useDispatch()
  const {
    loading: loadingAttendance,
    staffs: staffsAttendance,
    error: errorAttendance,
  } = useSelector((state) => state.staffAttendance)
  const { 
    loading: loadingStaffs,
    staffs: allStaffsData,
    error: errorStaffs,
  } = useSelector((state) => state.staffList)
  const allStaffs = allStaffsData && [...allStaffsData]

  useEffect(() => {
    // const staffsAttend = async () => {
    //   axios.get(
    //     // `/api/staffs/attendance`
    //   )
    //   .then((res) => setAttendanceList(res.data.staffs))
    //   .catch((err) => console.log(err.response.data.message))
    // }
    // staffsAttend()
    dispatch({
      type: STAFF_ATTENDANCE_RESET,
    })
    dispatch(listStaffs())
  }, [dispatch])

  var i = 1
  const submitAttendance = () => {
    dispatch(staffAttendances(allStaffsData))
  }
  const toggleAttendance = (id) => {
    if (attendanceList.length > 0) {
      let isPresent = attendanceList.filter((staff) => staff._id === id)[0].present
      setAttendanceList((prev) => 
        prev.map((staff) => {
          if (staff._id === id) {
            staff.present = !isPresent
          }
          return staff
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
    const new_staffs = allStaffs.filter((staff) => staff._id === id)
    new_staffs[0].present = !present[id]
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
      {staffsAttendance && (
        <Message variant='success' message={staffsAttendance.message} />
      )}
      {errorAttendance && (
        <Message variant='danger' message={errorAttendance.message} />
      )}
      <br />
      {loadingAttendance && <Loader />}
      {loadingStaffs 
        ? <Loader />
        : errorStaffs 
          ? <Message variant='danger' message={errorStaffs} />
          : <Table variant='striped'>
              <Thead className='py-2 bg-gray-50'>
                <Tr className='text-center'>
                  <Th className='w-[10%]'>SN</Th>
                  <Th>Staff</Th>
                  <Th className='w-[20%]'>Attendance</Th>
                </Tr>
              </Thead>
              <Tbody>
                {attendanceList.length > 0
                  ? attendanceList.map((staff) => (
                      <Tr key={staff._id} className='attendance'>
                        <Td>{i++}</Td>
                        <Td>
                          <div className='flex items-center gap-4'>
                            <img src={staff.image} className='w-12 h-12 object-contain'/>
                            {staff.staff_name}
                          </div>
                        </Td>
                        <Td 
                          className={`cursor-pointer ${staff.present ? '!bg-green-200' : '!bg-red-200'}`}
                          onClick={() => toggleAttendance(staff._id)}
                        >
                          {staff.present ? 'Present' : 'Absent'}
                        </Td>
                      </Tr>
                    ))
                  : allStaffs &&
                    allStaffs.map((staff) => (
                      <Tr key={staff._id} className='attendance'>
                        <Td>{i++}</Td>
                        <Td>
                          <div className='flex items-center gap-4'>
                            <img src={staff.image} className='w-12 h-12 object-contain'/>
                            {staff.staff_name}
                          </div>
                        </Td>
                        <Td 
                          className={`cursor-pointer ${present[staff._id] ? '!bg-green-200' : '!bg-red-200'}`}
                          onClick={() => toggleAttendance(staff._id)}
                        >
                          {present[staff._id] ? 'Present' : 'Absent'}
                        </Td>
                      </Tr>
                    ))}
              </Tbody>
            </Table>
      }
      {allStaffs && (
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

export default StaffAttendance