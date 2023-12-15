import { PiStudentFill } from 'react-icons/pi';
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdOutlineClass } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { FaMoneyCheckDollar } from "react-icons/fa6";

export const routes = [
    {
        title: 'Students',
        number: 0,
        path: "/students",
        icon: <PiStudentFill />,
    },
    {
        title: 'Teachers',
        number: 0,
        path: "/teacher_details",
        icon: <LiaChalkboardTeacherSolid />,
    },
    {
        title: 'Working Staffs',
        number: 0,
        path: "/non-teaching_staff_details",
        icon: <BsPersonWorkspace />,
    },
    {
        title: 'Classes',
        number: 13,
        path: "/student_details",
        icon: <MdOutlineClass />,
    },
    {
        title: 'Income',
        number: 0,
        path: "/income",
        icon: <GiReceiveMoney />,
    },
    {
        title: 'Salary Expenses',
        number: 0,
        path: "/salary",
        icon: <FaMoneyCheckDollar />,
    },
];
  