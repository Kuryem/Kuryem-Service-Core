const dbConfigs = {
  UserName: process.env.MONGOUSR,
  Password: process.env.MONGOPW,
  Host: process.env.MONGOHOST,
  Port: 27017,
  ConnectionString: process.env.MONGOCS,
  DbName: process.env.MONGONAME,
};

module.exports = dbConfigs;
