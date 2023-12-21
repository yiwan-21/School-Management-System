import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getStaffDetails, Update } from "../actions/staffActions";
import { Button, Input, Select } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const StaffDetailsEdit = ({ match }) => {
  const history = useHistory();
  const matchid = match.params.id;

  const dispatch = useDispatch();
  const staffDetails = useSelector((state) => state.staffDetails);
  const { loading, staff, error } = staffDetails;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [qualification, setQualification] = useState("");
  const [work, setWork] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [previous_school, setPreviousSchool] = useState("");
  const [age, setAge] = useState("");
  const [estimated_salary, setEstimatedSalary] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [valid, setValid] = useState(false);
  const [time, setTime] = useState(false);

  const staffUpdate = useSelector((state) => state.staffUpdate);
  const { loading: updateLoading, success, error: updateError } = staffUpdate;

  useEffect(() => {
    dispatch(getStaffDetails(matchid));
  }, [dispatch, matchid]);

  useEffect(() => {
    if (staff && staff._id) {
      setName(staff.staff_name || "");
      setEmail(staff.email || "");
      setQualification(staff.qualification || "");
      setAddress(staff.address || "");
      setWork(staff.work || "");
      setPhoneno(staff.contact_no || "");
      setPreviousSchool(staff.previous_school || "");
      setAge(staff.age || "");
      setEstimatedSalary(staff.estimated_salary || "");
      setGender(staff.gender || "");
      setImage(staff.image || "");
    }
  }, [staff]);

  const uploadFileHandler = async (e) => {
    const { data: CLOUDINARY_URL } = await axios.get("/api/config/cloudinary");
    const { data: CLOUDINARY_UPLOAD_PRESET } = await axios.get(
      "/api/config/cloudinarypreset"
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
        image,
        name.trim(),
        qualification,
        email,
        address,
        work,
        phoneno,
        previous_school,
        age,
        estimated_salary,
        gender
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
          <h1>Edit Staff Details</h1>
          <form onSubmit={handleUpdate}>
            <div className="form-inner">
              <div className="justify-center flex form-control2 ">
                <div className="image-upload-container text-white font-bold">
                  {image ? (
                    <div className="image-container">
                      <img src={image} alt="Staff" className="student-image" />
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
                <label htmlFor="name">Previous School</label>
                <Input
                  placeholder="Previous School"
                  type="text"
                  value={previous_school}
                  onChange={(e) => setPreviousSchool(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="name">Work</label>
                <Input
                  placeholder="Work"
                  type="text"
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
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
                <label htmlFor="name">Qualification</label>
                <Input
                  placeholder="Qualification"
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
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
                <label htmlFor="registration-fees">Salary </label>
                <Input
                  placeholder="Salary"
                  type="number"
                  value={estimated_salary}
                  onChange={(e) => setEstimatedSalary(e.target.value)}
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
              Update Staff
            </Button>
          </form>
          {error && <Message variant="danger" message={error} />}
        </div>
      )}
    </div>
  );
};

export default StaffDetailsEdit;
