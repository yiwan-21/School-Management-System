import dotenv from 'dotenv'
import { users } from './data/users.js'
import { items } from './data/Data.js'
import Dashboard from './models/dashboardModel.js'
import Admin from './models/adminModel.js'
import Student from './models/studentModel.js'

const students = [
  {
    registered_by: 'admin123', 
    student_name: 'John Doe',
    classname: 'Class 10A',
    roll_no: 101,
    address: '123 Main Street, City',
    parents_name: 'Jane Doe',
    contact_no: '123-456-7890',
    gender: 'Male',
    previous_dues: 0,
    age: '15',
    email: 'john.doe@example.com',
    registration_fees: 200, 
    image: 'https://www.cta.org/wp-content/uploads/2020/03/empty-classroom.jpg', 
  }
]
dotenv.config()
import connectDB from './config/db.js'
connectDB()
const importData = async () => {
  try {
    await Admin.deleteMany()
    await Student.deleteMany()
    await Dashboard.deleteMany()
    const createdUsers =
      await Admin.insertMany(users)
    console.log('inserted users')
    const adminUser = createdUsers[0]._id

    const sampleStudents = students.map((student) => {
      return { ...student, user: adminUser }
    })

    await Dashboard.insertMany(items)
    await Student.insertMany(sampleStudents)


    console.log('Data imported.')
    process.exit()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    // await Student.deleteMany()
    await Dashboard.deleteMany()
    await Admin.deleteMany()

    console.log('Data destroyed.')
    process.exit()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
