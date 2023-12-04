import React, { useEffect, useState } from "react";
import { getBalance } from "./getWeb3.js";


class Balance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert("Check the balance boi!");
        
        getBalance()
            .then((balance) => {
            this.setState({value: balance});
            })
            .catch((err) => {
            console.log(err);
            });
          
        event.preventDefault();
    }
    
    render() {
        return(
            <div className="Balance">
                <p>{this.getSnapshotBeforeUpdate()}</p>
                <form onSubmit={this.handleSubmit}>
                <input type="submit" value="Check Balance" />
                </form>
            </div>
            
        );
    }
}
export default Balance;