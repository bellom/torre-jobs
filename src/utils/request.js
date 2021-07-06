import axios from "axios";

const adapter = axios.create({
  baseURL: "http://localhost:8080"
});

// const relevantJobsUrl = 'https://search.torre.co/opportunities/_search/?size=10&aggregate=false&offset=0';
// const jobDetailsUrl = 'https://torre.co/api/opportunities/'
// const employeesUrl = 'https://search.torre.co/people/_search/?offset=0&size=10&aggregate=false'

export const getUser = async (username) => {
  const response = await adapter.get(`/user/${username}`);
  return response.data;
};

export const getRelevantJobs = async (username) => {
  const response = await adapter.get('/jobs');
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