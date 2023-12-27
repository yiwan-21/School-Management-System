import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../middleware/authMiddleware.js";
import NonTeachingStaff from "../models/nonTeachingStaffModel.js";
import capitalize from "../config/capitalize.js";
import Dashboard from "../models/dashboardModel.js";
import NonTeachingStaffSalary from "../models/nonTeachingStaffSalary.js";
import nonTeachingStaffAttendance from "../models/nonTeachingStaffAttendance.js";
import TeacherSalary from "../models/teacherSalaryModel.js";
const router = express.Router();

router.post(
  "/edit/:id",
  asyncHandler(async (req, res) => {
    const nonTeachingStaff = await NonTeachingStaff.findById(req.params.id);
    console.log(nonTeachingStaff);
    if (nonTeachingStaff) {
      res.json(nonTeachingStaff);
    } else {
      res.status(404);
      throw new Error("Non teaching staff not found");
    }
  })
);

//following route is for updating the non teaching staff details
router.put(
  "/update/:id",
  protect,
  asyncHandler(async (req, res) => {
    const staffId = req.params.id;
    const {
      image,
      staff_name,
      qualification,
      email,
      address,
      contact_no,
      work,
      previous_school,
      age,
      estimated_salary,
      gender,
    } = req.body;

    try {
      const existingStaff = await NonTeachingStaff.findById(staffId);

      if (!existingStaff) {
        res.status(404).json({ message: "Non teaching staff not found" });
        return;
      }

      existingStaff.image = image;
      existingStaff.staff_name = staff_name;
      existingStaff.qualification = qualification;
      existingStaff.email = email;
      existingStaff.address = address;
      existingStaff.contact_no = contact_no;
      existingStaff.work = work;
      existingStaff.previous_school = previous_school;
      existingStaff.age = age;
      existingStaff.estimated_salary = estimated_salary;
      existingStaff.gender = gender;
      const updatedStaff = await existingStaff.save();

      if (updatedStaff) {
        res.json({
          message: "Non teaching staff updated successfully",
          updatedStaff,
        });
      } else {
        res
          .status(400)
          .json({ message: "Unable to update non teaching staff" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//following router is for registering the teacher

router.post(
  "/register",
  //the protect used here is used for getting the id of the admin who registered the teacher

  protect,
  asyncHandler(async (req, res) => {
    const {
      staff_name,

      qualification,

      address,

      contact_no,
      gender,
      previous_school,

      age,
      email,
      estimated_salary,
      image,
      work,
    } = req.body;
    // const staff_info =
    const staff_info =
      (await NonTeachingStaff.find()) &&
      (await NonTeachingStaff.findOne().sort({ staffId: -1 }).limit(1));
    console.log("staff info", staff_info);
    if (staff_info) {
      var staffId = staff_info.staffId + 1;
    } else {
      var staffId = 1;
    }

    console.log(req.body);
    const registered_by = req.user.name;

    console.log(registered_by);

    console.log("staff id is-", staffId);
    const staffname = capitalize(staff_name);
    const new_staff = await NonTeachingStaff.create({
      registered_by,
      staff_name: staffname,
      staffId,

      qualification,

      address,

      contact_no,
      gender,
      previous_school,

      age,
      email,
      estimated_salary,
      image,
      work,
    });
    console.log(new_staff);
    if (new_staff) {
      const total_staffs = (await NonTeachingStaff.find()).length;
      await Dashboard.findOneAndUpdate(
        { title: "Working Staffs" },
        { number: total_staffs }
      );
      console.log("done");
      console.log("total number of students", total_staffs);
      res.status(201).json({
        message: "Staff registered successfully",
      });
      console.log("registered successfully");
    } else {
      res.status(400);
      console.log(error);
      throw new Error("Unable to register the staff");
    }
  })
);
//router for getting all the staffs
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const staffs = await NonTeachingStaff.find({});
    if (staffs.length > 0) {
      res.json(staffs);
    } else {
      res.status(500);
      throw new Error("No staffs found");
    }
  })
);

//following route is for deleting the teacher

router.delete(
  "/delete/:id",
  asyncHandler(async (req, res) => {
    const staff = await NonTeachingStaff.findOne({ staffId: req.params.id });
    if (staff) {
      await staff.remove();
      const total_staffs = (await NonTeachingStaff.find()).length;
      await Dashboard.findOneAndUpdate(
        { title: "Working Staffs" },
        { number: total_staffs }
      );
      res.json({ message: "Staff Deleted successfully" });
    } else {
      res.status(404);
      throw new Error("Staff not found with the given ID");
    }
  })
);

// the following route is for loading attendance and staffs info.
router.get(
  "/attendance",
  asyncHandler(async (req, res) => {
    const staffs = await nonTeachingStaffAttendance.findOne({
      attendance_date: { $gte: new Date().setHours(0, 0, 0) },
    });

    if (staffs) {
      res.json(staffs);
    } else {
      res.status(404).json({ message: "No staffs found." });
    }
  })
);

//following route is for attendance of staffs
router.post(
  "/attendance",
  protect,
  asyncHandler(async (req, res) => {
    const { staffs } = req.body;
    const admin = req.user.name;
    const attendanceFound = await TeacherAttendance.findOne({
      attendance_date: { $gte: new Date().setHours(0, 0, 0) },
    });
    if (attendanceFound) {
      await TeacherAttendance.updateOne(
        { _id: attendanceFound._id },
        { $set: { staffs: staffs } }
      );
      res.status(201).json({ message: "Attendance retaken successfully" });
    } else {
      const new_attendance = await TeacherAttendance.create({
        admin,
        attendance_date: new Date(),
        staffs,
      });
      if (new_attendance) {
        res.status(201).json({
          message: "Attendance taken successfully",
        });
      } else {
        res.status(400);
        throw new Error("Unable to take attendance");
      }
    }
  })
);

//following route is for paying the fees of teachers

router.post(
  "/fees/:name/:id",
  //the protect used here is used for getting the id of the admin who registered the teacher

  protect,
  asyncHandler(async (req, res) => {
    const { salaryForTheYear, salaryForTheMonth, salaryAmount } = req.body;
    console.log(req.body);
    // const teacher_info =
    const staff_info = await NonTeachingStaff.findOne({
      staff_name: capitalize(req.params.name),
      staffId: req.params.id,
    });
    console.log(staff_info);
    console.log(capitalize(req.params.name + " " + req.params.id));

    console.log("staff info", staff_info);
    if (staff_info) {
      const admin = req.user.name;

      // console.log(admin)

      // console.log('staff id is-', staffId)
      const staffname = capitalize(req.params.name);
      const monthname = capitalize(salaryForTheMonth);
      const new_staff = await NonTeachingStaffSalary.create({
        admin,
        staff_name: staffname,
        staffId: req.params.id,

        salaryForTheYear,
        salaryForTheMonth: monthname,
        salaryAmount,
      });
      console.log(new_staff);
      if (new_staff) {
        const Fees = await TeacherSalary.find()
          .select("salaryAmount")
          .select("-_id");
        console.log("Fees", Fees);
        var total_Fees = 0;
        // for (i = 0; i < Fees.length; i++) {
        //   total_Fees = Fees[i]
        // }
        var total_Fees = 0;
        Fees.map(
          (fee) => (total_Fees = total_Fees + fee.salaryAmount)
          // return total_Fees
        );
        const Fees1 = await NonTeachingStaffSalary.find()
          .select("salaryAmount")
          .select("-_id");
        // for (i = 0; i < Fees.length; i++) {
        //   total_Fees = Fees[i]
        // }
        var total_Fees1 = 0;
        Fees1.map(
          (fee) => (total_Fees1 = total_Fees1 + fee.salaryAmount)
          // return total_Fees
        );
        await Dashboard.findOneAndUpdate(
          { title: "Salary Expenses" },
          { number: total_Fees + total_Fees1 }
        );
        res.status(201).json({
          message: "staff salary paid successfully",
        });
        console.log("paid successfully");
      } else {
        res.status(400);
        console.log(error);
        throw new Error("Unable to pay the salary");
      }
    } else {
      res.status(400);
      throw new Error("staff not found");
    }
  })
);
//router for getting all the staffs
// router.get(
//   '/',
//   asyncHandler(async (req, res) => {
//     const teachers = await Teacher.find({})
//     if (teachers.length > 0) {
//       res.json(teachers)
//     } else {
//       res.status(500)
//       throw new Error('No Teachers found')
//     }
//   })
// )

export default router;
