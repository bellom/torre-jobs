import axios from "axios";

const adapter = axios.create({
  baseURL: "https://torre-v2-api.herokuapp.com"
});

const relevantJobsUrl = 'https://search.torre.co/opportunities/_search/?size=10&aggregate=false&offset=0';
const jobDetailsUrl = 'https://torre.co/api/opportunities/'
const employeesUrl = 'https://search.torre.co/people/_search/?offset=0&size=10&aggregate=false'

export const getUser = async (username) => {
  const response = await adapter.get(`/user/${username}`);
  return response.data;
};

export const getRelevantJobs = async (username) => {
  const response = await axios.post(relevantJobsUrl,
    { "bestfor": { "username": username.toLowerCase() } });
  return response.data;
}

export const getJobDetails = async (jobId) => {
  const response = await axios.get(`${jobDetailsUrl}${jobId}`);
  return response.data;
};

export const getEmployees = async (company) => {
  const response = await axios.post(employeesUrl,
    { "and": [{ "organization": { "term": company } }] });
  return response.data;
}