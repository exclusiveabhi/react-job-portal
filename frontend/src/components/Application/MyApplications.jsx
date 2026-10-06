import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Navigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const getStatusBadge = (status) => {
  const statusConfig = {
    pending: { text: "Pending", color: "#ffc107", bgColor: "#fff3cd" },
    shortlisted: { text: "Shortlisted", color: "#198754", bgColor: "#d1e7dd" },
    rejected: { text: "Rejected", color: "#dc3545", bgColor: "#f8d7da" },
  };
  return statusConfig[status] || statusConfig.pending;
};

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [updatingIds, setUpdatingIds] = useState(new Set());

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  const fetchApplications = async () => {
    try {
      let res;
      if (user && user.role === "Employer") {
        res = await axios.get(
          "http://localhost:4000/api/v1/application/employer/getall",
          { withCredentials: true }
        );
      } else {
        res = await axios.get(
          "http://localhost:4000/api/v1/application/jobseeker/getall",
          { withCredentials: true }
        );
      }
      setApplications(res.data.applications);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch applications";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [isAuthorized]);

  const updateStatus = async (id, status) => {
    if (updatingIds.has(id)) {
      return;
    }

    setUpdatingIds((prev) => new Set(prev).add(id));

    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/application/status/${id}`,
        { status },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      fetchApplications();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update status";
      toast.error(errorMessage);
    } finally {
      setUpdatingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/application/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setApplications((prevApplication) =>
        prevApplication.filter((application) => application._id !== id)
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete application";
      toast.error(errorMessage);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <center>
            <h1>My Applications</h1>
          </center>
          {applications.length <= 0 ? (
            <>
              {" "}
              <center>
                <h4>No Applications Found</h4>
              </center>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <center>
            <h1>Applications From Job Seekers</h1>
          </center>
          {applications.length <= 0 ? (
            <>
              <center>
                <h4>No Applications Found</h4>
              </center>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                  updateStatus={updateStatus}
                  isUpdating={updatingIds.has(element._id)}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  const statusBadge = getStatusBadge(element.status);
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
          <p>
            <span>Status:</span>{" "}
            <span
              style={{
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "bold",
                color: statusBadge.color,
                backgroundColor: statusBadge.bgColor,
              }}
            >
              {statusBadge.text}
            </span>
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal, updateStatus, isUpdating }) => {
  const statusBadge = getStatusBadge(element.status);
  const currentStatus = element.status;
  
  const isShortlisted = currentStatus === "shortlisted";
  const isRejected = currentStatus === "rejected";
  
  const shouldShowShortlist = !isShortlisted && !isRejected;
  const shouldShowReject = !isRejected;

  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
          <p>
            <span>Status:</span>{" "}
            <span
              style={{
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "bold",
                color: statusBadge.color,
                backgroundColor: statusBadge.bgColor,
              }}
            >
              {statusBadge.text}
            </span>
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div
          className="btn_area"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {shouldShowShortlist && (
            <button
              onClick={() => updateStatus(element._id, "shortlisted")}
              disabled={isUpdating}
              style={{
                backgroundColor: "#198754",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: isUpdating ? "not-allowed" : "pointer",
                fontWeight: "bold",
                opacity: isUpdating ? 0.7 : 1,
              }}
            >
              {isUpdating ? "Updating..." : "Shortlist"}
            </button>
          )}
          {shouldShowReject && (
            <button
              onClick={() => updateStatus(element._id, "rejected")}
              disabled={isUpdating}
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: isUpdating ? "not-allowed" : "pointer",
                fontWeight: "bold",
                opacity: isUpdating ? 0.7 : 1,
              }}
            >
              {isUpdating ? "Updating..." : "Reject"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
