const axios = require("axios");

const userUrl = 'https://torre.bio/api/bios/';

const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`${userUrl}${username}`);
    return res.send(response.data);
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports = {
  get_user: getUser,
}
