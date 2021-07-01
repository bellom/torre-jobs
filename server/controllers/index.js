const axios = require("axios");

const userUrl = 'https://torre.bio/api/bios/';
// const relevantJobsUrl = 'https://search.torre.co/opportunities/_search/?size=1&aggregate=false&offset=0';
// const jobDetailsUrl = 'https://torre.co/api/opportunities/'
// const employeesUrl = 'https://search.torre.co/people/_search/?offset=0&size=3&aggregate=false'

const getUser = async (req, res) => {
  const { username } = req.params;
  const response = await axios.get(`${userUrl}${username}`);
  return res.send(response.data);
}

module.exports = {
  get_user: getUser,
}
