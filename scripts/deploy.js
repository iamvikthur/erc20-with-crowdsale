const { ethers } = require("hardhat");
const hre = require("hardhat");
require("dotenv").config({path: './.env'})


const _toWei = (number, unit = 18) => {
  return ethers.utils.parseUnits(number, unit).toString();
}

async function main() {

  const airdropQuantity = ((process.env.AIRDROP / 100) * process.env.TOTAL_SUPPLY).toString();
  const supportQuantity = ((process.env.SUPPORT / 100) * process.env.TOTAL_SUPPLY).toString();
  const presaleQuantity = ((process.env.PRESALE / 100) * process.env.TOTAL_SUPPLY).toString();
  const marketingQuantity = ((process.env.MARKETING / 100) * process.env.TOTAL_SUPPLY).toString();

  const [deployer] = await ethers.getSigners();
  console.log(`Token Deployer Address: ${deployer.address}`);


  // deploy token lock contract 
  console.log("!!!======= Deploying Token Lock =======!!!");
  const Tokenlock = await hre.ethers.getContractFactory("Tokenlock");
  const tokenlock = await Tokenlock.deploy();
  await tokenlock.deployed();
  console.log(`Token Lock Contract Address: ${tokenlock.address}`);


  console.log("!!!======= Deploying Token =======!!!");
  // deploy token contract 
  const Token = await hre.ethers.getContractFactory("MRTLANDTOKEN");
  const totalSupply = _toWei(process.env.TOTAL_SUPPLY);
  const token = await Token.deploy(totalSupply, tokenlock.address);
  await token.deployed();
  console.log(`Token Contract Address: ${token.address}`);


  console.log("!!!======= Deploying Token Sale =======!!!");
  // deploy token lock contract 
  const Tokensale = await hre.ethers.getContractFactory("Crowdsale");
  const tokensale = await Tokensale.deploy(10000, deployer.address, token.address);
  await tokensale.deployed();
  console.log(`Token Sale Contract Address: ${tokensale.address}`);


  // Distribute tokens here: TOKENOMICS
  console.log(`Starting Token Distribution`);
  await token.transfer(process.env.AIRDROP_ADDR, _toWei(airdropQuantity));
  await token.transfer(process.env.SUPPORT_ADDR, _toWei(supportQuantity));
  await token.transfer(process.env.PRESALE_ADDR, _toWei(presaleQuantity));
  await token.transfer(process.env.MARKETING_ADDR, _toWei(marketingQuantity));
  console.log("!!!======= Deployment and distribution complete =======!!!")
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
