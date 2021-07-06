const axios = require("axios");

const userUrl = 'https://torre.bio/api/bios/';
const relevantJobsUrl = 'https://search.torre.co/opportunities/_search/?size=10&aggregate=false&offset=0';
const jobDetailsUrl = 'https://torre.co/api/opportunities/';
const employeesUrl = 'https://search.torre.co/people/_search/?offset=0&size=10&aggregate=false';


const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`${userUrl}${username}`);
    const result = response.data
    .filter(data => {
      return data.person
    })
    // .filter(data => {
    //   return {
    //     picture: data.picture,
    //     professionalHeadline: data.professionalHeadline,
    //     name: data.name,
    //     location: data.location.country
    //   }
    // })
    // run a filter on response.data
    return res.send(result);
  } catch (error) {
    res.status(404).send(error)
  }
}

const getRelevantJobs = async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.post(relevantJobsUrl,
      { "bestfor": { "username": username.toLowerCase() } });
    return res.send(response.data);
  } catch (error) {
    res.status(404).send(error)
  }
}

const getJobDetails = async (jobId) => {
  const response = await axios.get(`${jobDetailsUrl}${jobId}`);
  return response.data;
};

const getEmployees = async (company) => {
  const response = await axios.post(employeesUrl,
    { "and": [{ "organization": { "term": company } }] });
  return response.data;
}


module.exports = {
  get_user: getUser,
  get_relevant_job: getRelevantJobs,
  get_job_details: getJobDetails,
  get_employees: getEmployees,
}
