export const routes = [
  {
    collapse: false,
    name: "Dashboard",
    path: "/",
    icon: "fa fa-home",
  },
  {
    collapse: true,
    name: "Student Section",
    icon: "fa fa-graduation-cap",
    paths: [
      {
        name: "Student Registration",
        path: "/student-register",
        icon: "fa fa-pencil-square-o",
      },
      {
        name: "Student Fees",
        path: "/student-fee",
        icon: "fa fa-money",
      },
      {
        name: "Student Details",
        path: "/student_details",
        icon: "fa fa-info-circle",
      },
      {
        name: "Student Attendance",
        path: "/student-attendance",
        icon: "fa fa-file-text",
      },
      {
        name: "Admit Card",
        path: "/admit_card",
        icon: "fa fa-id-card",
      },
    ],
  },
  {
    collapse: true,
    name: "Teacher Section",
    icon: "fa fa-book",
    paths: [
      {
        name: "Teacher Registration",
        path: "/teacher_register",
        icon: "fa fa-pencil-square-o",
      },
      {
        name: "Teacher Salary",
        path: "/teacher_salary",
        icon: "fa fa-money",
      },
      {
        name: "Teacher Details",
        path: "/teacher_details",
        icon: "fa fa-info-circle",
      },
      {
        name: "Teacher Attendance",
        path: "/teacher_attendance",
        icon: "fa fa-file-text",
      },
    ],
  },
  {
    collapse: true,
    name: "Non-Teaching Staff Section",
    icon: "fa fa-id-badge",
    paths: [
      {
        name: "Registration",
        path: "/non-teaching_staff_register",
        icon: "fa fa-pencil-square-o",
      },
      {
        name: "Salary",
        path: "/non-teaching_staff_salary",
        icon: "fa fa-money",
      },
      {
        name: "Details",
        path: "/non-teaching_staff_details",
        icon: "fa fa-info-circle",
      },
      {
        name: "Attendance",
        path: "/non-teaching_staff_attendance",
        icon: "fa fa-file-text",
      },
    ],
  },
  {
    collapse: false,
    name: "Log Out",
    path: "/login",
    icon: "fa fa-sign-out",
  },
];
