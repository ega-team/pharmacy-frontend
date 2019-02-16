const SimpleStorage = artifacts.require('./Hello.sol')

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage)
}
