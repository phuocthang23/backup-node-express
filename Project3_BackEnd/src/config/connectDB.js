const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("project", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const connectionDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection database successfully");
  } catch (error) {
    console.error("Không thể kết nối đến cơ sở dữ liệu:", error);
  }
};

module.exports = connectionDatabase;
