// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const arguments = ["Hello, World!. This is a simple message box."]
  const MessageBox = await hre.ethers.getContractFactory("MessageBox");
  const messageBox = await MessageBox.deploy(...arguments);

  await messageBox.deployed();

  console.log("MessageBox deployed to:", messageBox.address);

  console.log("Started verifying :", messageBox.address);
  await hre.run("verify:verify", {
    address: messageBox.address,
    constructorArguments: [...arguments],
  });
  console.log("Done verifying :", messageBox.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
