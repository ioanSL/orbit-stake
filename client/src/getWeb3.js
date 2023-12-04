import Web3 from "web3";
import OrbitStaking from "contracts/Orbit.json";

let isInitialized = false;
let selectedAccount;
let orbitStakeInstance;

export const init = async () => {
  let provider = window.ethereum;

    if (typeof provider != "undefined"){
      // Metamask is installed

      provider
        .request({method: "eth_requestAccounts"})
        .then((accounts) => {
          selectedAccount = accounts[0];
          console.log("Selected account is: ", selectedAccount);
        })
        .catch((err) => {
          console.log(err);
        });

        window.ethereum.on("accountsChanged", function (accounts){
          selectedAccount = accounts[0];
          console.log("Changed account to: ", selectedAccount);
        });
    }

    const web3Provider = new Web3(provider);

    const networkId = await web3Provider.eth.getChainId();

    orbitStakeInstance = new web3Provider.eth.Contract(
      OrbitStaking.abi, 
      OrbitStaking.networks[networkId].address
    );
    isInitialized = true;
};

export const getBalance =  async () => {
  if (!isInitialized) {
    await init();
  }
  return orbitStakeInstance.methods
    .balanceOf(selectedAccount)
    .call()
    .then(balance => {return balance});
}

export const getStakedBalance =  async () => {
  if (!isInitialized) {
    await init();
  }
  return orbitStakeInstance.methods
    .stakedBalanceOf(selectedAccount)
    .call()
    .then(stakedBalance => {return stakedBalance});
}

export const stakeAmount = async (amount) => {
  if (!isInitialized) {
    await init();
  }
  return orbitStakeInstance.methods
    .stake(amount).send({from: selectedAccount})
    .then(tx => {console.log(tx)});
}

export default init;
