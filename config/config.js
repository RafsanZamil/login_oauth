require("dotenv").config();


const dev = {
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    url: process.env.DB_URL ,
  },
  secret: {
  secret: process.env.SECRET,
}
};

module.exports = dev;
