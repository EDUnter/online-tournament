const fs = require("fs");
const db = require('_helpers/db');

module.exports = {
  getAll,
  getById,
  create
};

async function getAll() {
  const sponsorLogos = await db.SponsorLogos.findAll();
  return sponsorLogos.map(x => basicDetails(x));
}

async function getById(id) {
  const sponsorLogo = await getSponsorLogo(id);
  return basicDetails(sponsorLogo);
}

async function create(params) {
  try {
    console.log(req.file);
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    db.SponsorLogos.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + image.name,
        image.data
      );
      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
}

// helper functions
async function getSponsorLogo(id) {
  const sponsorLogo = await db.SponsorLogos.findByPk(id);
  if (!sponsorLogo) throw 'Sponsor Logo not found';
  return sponsorLogo;
}

function basicDetails(sponsorLogo) {
  const { id, type, name, data, tournamentId, accountId, googleMaps } = sponsorLogo;
  return { id, type, name, data, tournamentId, accountId, googleMaps };
}