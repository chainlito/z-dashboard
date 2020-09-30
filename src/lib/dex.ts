import Config from 'config';
import web3client from './web3client';
import coingecko from './coingecko';

const getLpTokenPrice = async () => {
  const totalSupply = await web3client.getTotalSupply(web3client.uniLpTokenContract);
  const wethBalance = await web3client.getBalance(web3client.wethTokenContract, Config.UniLpToken.address);
  const ethPrice = await coingecko.getEthPrice();
  return 2 * ethPrice * wethBalance / totalSupply;
}

const getYTokenPrice = async () => {
  const wethSupply = await web3client.getBalance(web3client.wethTokenContract, Config.YPair.address);
  const tokenSupply = await web3client.getBalance(web3client.yTokenContract, Config.YPair.address);
  const ethPrice = await coingecko.getEthPrice();
  return ethPrice * wethSupply / tokenSupply;
}

const getZTokenPrice = async () => {
  const wethSupply = await web3client.getBalance(web3client.wethTokenContract, Config.ZPair.address);
  const tokenSupply = await web3client.getBalance(web3client.tokenContract, Config.ZPair.address);
  const ethPrice = await coingecko.getEthPrice();
  return ethPrice * wethSupply / tokenSupply;
}

export default {
  getLpTokenPrice,
  getYTokenPrice,
  getZTokenPrice,
};
