const axios = require("axios");

const userUrl = 'https://torre.bio/api/bios/';
const relevantJobsUrl = 'https://search.torre.co/opportunities/_search/?size=10&aggregate=false&offset=0';
const jobDetailsUrl = 'https://torre.co/api/opportunities/';
const employeesUrl = 'https://search.torre.co/people/_search/?offset=0&size=10&aggregate=false';


const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`${userUrl}${username}`);
    const { person: { location: { country }, name, picture, professionalHeadline } } = response.data;
    const personData = {name, country, picture, professionalHeadline};
    return res.send(personData);
  } catch (error) {
    res.status(404).send(error)
  }
}

const getRelevantJobs = async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.post(relevantJobsUrl,
      { "bestfor": { "username": username.toLowerCase() } });
    const jobs = response.data?.results?.map(e => {
      const organizationName = e.organizations?.[0]?.name
      return {
        id: e.id, objective: e.objective, type: e.type, organizationName
      }
    });    
    return res.send(jobs);
  } catch (error) {
    res.status(404).send(error);
  }
}

const getJobDetails = async (req, res) => {
  try {
    const { jobId } = req.params;
    const response = await axios.get(`${jobDetailsUrl}${jobId}`);
    const { 
      organizations, 
      serpTags: { title, baseSalary: { currency, value: { minValue, maxValue, unitText } }, employmentType }, 
      deadline 
    } = response.data;
    const formatDate = new Date(deadline || null).toUTCString();
    const type = employmentType?.[0].replace(/_/g, " ");
    const picture = organizations?.[0].picture;
    const name = organizations?.[0].name;
    const formattedType = unitText.toLowerCase();
    const jobDetails = { 
      picture,
      name,
      title,
      currency,
      minValue,
      maxValue,
      formattedType,
      type,
      deadline: formatDate
    };
    return res.send(jobDetails);
  } catch (error) {
    res.status(404).send(error)
  }
};

const getEmployees = async (req, res) => {
  try {
    const { company } = req.params;
    const response = await axios.post(employeesUrl,
      { "and": [{ "organization": { "term": company } }] });
    const employees = response.data?.results?.map(e => {
      return {
        picture: e.picture,
        name: e.name,
        professionalHeadline: e.professionalHeadline
      }
    })
    return res.send(employees)
  } catch (error) { 
    res.status(404).send(error)
  }
}


module.exports = {
  get_user: getUser,
  get_relevant_job: getRelevantJobs,
  get_job_details: getJobDetails,
  get_employees: getEmployees,
}
