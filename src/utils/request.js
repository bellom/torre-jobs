import axios from "axios";

const adapter = axios.create({
  baseURL: "http://localhost:8080"
});

export const getUser = async (username) => {
  const response = await adapter.get(`/user/${username}`);
  return response.data;
};

export const getRelevantJobs = async (username) => {
  const response = await adapter.get(`/jobs/${username}`);
  return response.data;
}

export const getJobDetails = async (jobId) => {
  const response = await adapter.get(`/job/${jobId}`);
  return response.data;
};

export const getEmployees = async (company) => {
  const response = await adapter.get(`/employees/${company}`);
  return response.data;
}