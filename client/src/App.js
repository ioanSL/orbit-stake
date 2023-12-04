import React, { useEffect, useState } from "react";
import { getBalance, getStakedBalance, stakeAmount } from "./getWeb3.js";

function App() {

    const [balance, setBalance] = useState(0);
    const [stakedBalance, setStakedBalance] = useState(0)
    const onStakeAmount = 0;

    const fetchBalance = () => {
      getBalance()
        .then((balance) => {
          setBalance(balance);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const fetchStakedBalance = () => {
      getStakedBalance()
        .then((stakedBalance) => {
          setStakedBalance(stakedBalance);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const stake = () => {
      stakeAmount(onStakeAmount);
      }

  return (
    <div className="App">
      <p>Your balance is {balance}</p>
			<button onClick={() => fetchBalance()}>Refresh balance</button>

      <form onSubmit={stake()}>
        <label>
          <input type="number" value={onStakeAmount} name="Stake:" />
        </label>
        <input type="submit" value="Stake" />
      </form>
      
      <p>----------------------------------------</p>

      <form>
        <label>
          <input type="number" name="Unstake:" />
        </label>
        <input type="submit" value="Unstake" />
      </form>
      
      <p>Your balance is {stakedBalance}</p>
			<button onClick={() => fetchStakedBalance()}>Refresh balance</button>

    </div>
  );
}

export default App;
