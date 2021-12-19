const Migrations = artifacts.require("Migrations");
const CryptoPeons = artifacts.require("CryptoPeons");

module.exports = async function (deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(CryptoPeons);
};
