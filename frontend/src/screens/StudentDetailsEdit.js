import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getStudentDetails, Update } from "../actions/studentActions";
import { Button, Input, Select } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { SERVER_URL } from "../constants/serverConstant";

const StudentDetailsEdit = ({ match }) => {
  const history = useHistory();
  const matchid = match.params.id;

  const dispatch = useDispatch();
  const studentDetails = useSelector((state) => state.studentDetails);
  const { loading, student, error } = studentDetails;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [classname, setClassname] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [parentname, setParentname] = useState("");
  const [age, setAge] = useState("");
  const [registrationfees, setRegistrationfees] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [valid, setValid] = useState(false);
  const [time, setTime] = useState(false);

  const studentUpdate = useSelector((state) => state.studentUpdate);
  const { loading: updateLoading, success, error: updateError } = studentUpdate;

  useEffect(() => {
    // Fetch student details
    dispatch(getStudentDetails(matchid));
  }, [dispatch, matchid]);

  // Update state when student details change
  useEffect(() => {
    // Check if student details are available
    if (student && student._id) {
      // Populate form fields with student details
      setName(student.student_name || "");
      setEmail(student.email || "");
      setAddress(student.address || "");
      setGender(student.gender || "");
      setClassname(student.classname || "");
      setPhoneno(student.contact_no || "");
      setParentname(student.parents_name || "");
      setAge(student.age || "");
      setRegistrationfees(student.registration_fees || "");
      setImage(student.image || "");
    }
  }, [student]);

  const uploadFileHandler = async (e) => {
    const { data: CLOUDINARY_URL } = await axios.get(`${SERVER_URL}/api/config/cloudinary`);
    const { data: CLOUDINARY_UPLOAD_PRESET } = await axios.get(
      `${SERVER_URL}/api/config/cloudinarypreset`
    );

    setTime(true);
    setTimeout(() => {
      setTime(false);
    }, 10000);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_CLOUD_PRESET);
    setUploading(true);
    await axios({
      url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: formData,
    })
      .then(function (res) {
        setImage(res.data.url);
      })
      .catch(function (err) {
        console.error(err);
      });
    setUploading(false);
    console.log("url is", image);
  };

  const [fileInputLabel, setFileInputLabel] = useState("Update Picture");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setFileInputLabel("Change Photo");
    setValid(true);

    // Dispatch the Update action with the updated data
    await dispatch(
      Update(
        matchid,
        name.trim(),
        classname,
        address,
        parentname,
        phoneno,
        gender,
        age,
        email,
        registrationfees,
        image
      )
    );
    history.goBack();
    setTimeout(() => {
      setValid(false);
    }, 10000);
  };

  return (
    <div className="container1">
      {loading ? (
        <Loader />
      ) : (
        <div className="outer-layout">
          <h1>Edit Student Details</h1>
          <form onSubmit={handleUpdate}>
            <div className="form-inner">
              <div className="justify-center flex form-control2 ">
                <div className="image-upload-container text-white font-bold">
                  {image ? (
                    <div className="image-container">
                      <img
                        src={image}
                        alt="Student"
                        className="student-image"
                      />
                    </div>
                  ) : (
                    <div className="placeholder-text">No Image Uploaded</div>
                  )}
                  <div className="py-2"></div>
                  <label className="custom-file-input-label2">
                    {fileInputLabel}
                    <input
                      type="file"
                      className="custom-file-input2"
                      onChange={uploadFileHandler}
                    />
                  </label>
                </div>
              </div>
              <div className="form-control">
                {uploading && <Loader />}
                {time && image && (
                  <Message
                    variant="success"
                    message="Picture uploaded successfully"
                  />
                )}
              </div>
              <div className="form-control">
                <label htmlFor="name">Full Name</label>
                <Input
                  placeholder="Full Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="name">Email</label>
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="name">Address</label>
                <Input
                  placeholder="Address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="name">Gender</label>
                <Select
                  required
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>

                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </Select>
              </div>
              <div className="form-control">
                <label htmlFor="name">Class</label>
                <Select
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
                </Select>
              </div>
              <div className="form-control">
                <label htmlFor="name">Phone Number</label>
                <Input
                  placeholder="Phone Number"
                  type="text"
                  value={phoneno}
                  onChange={(e) => setPhoneno(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="name">Parent's Name</label>
                <Input
                  placeholder="Parent's Name"
                  type="text"
                  value={parentname}
                  onChange={(e) => setParentname(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="name">Age</label>
                <Input
                  placeholder="Age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="registration-fees">Registration Fees</label>
                <Input
                  placeholder="Registration Fees"
                  type="number"
                  value={registrationfees}
                  onChange={(e) => setRegistrationfees(e.target.value)}
                  required
                />
              </div>
            </div>
            {success && valid && (
              <Message
                style={{ marginBottom: "3px" }}
                variant="success"
                message={success.message}
              />
            )}
            <Button
              height={"auto"}
              className="btn-register"
              type="submit"
              colorScheme="whatsapp"
            >
              Update Student
            </Button>
          </form>
          {error && <Message variant="danger" message={error} />}
        </div>
      )}
    </div>
  );
};

export default StudentDetailsEdit;