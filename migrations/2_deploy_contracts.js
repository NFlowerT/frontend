const HeloWorld = artifacts.require("HelloWorld");

module.exports = function (deployer) {
    deployer.deploy(HeloWorld);
};
