import React, { Component } from "react";
import axios from "axios";

class Pathfinder extends Component {
  state = {
    pathFinderInput: "",
    pathFinderResponse: {},
    invalidInput:true
  };

  onSubmit = e => {
    e.preventDefault();
    this.requestPathfinderService();
    this.setState({ pathFinderInput: "" });
    this.setState({ invalidInput: true });
  };

  onChange = e =>{ 
      this.setState({ [e.target.name]: e.target.value });
      try{
        JSON.parse("[" +  e.target.value + "]");
        this.setState({ invalidInput: false });
      }
      catch{
        this.setState({ invalidInput: true });
      }
  }

  requestPathfinderService() {
    axios
      .post(
        "http://localhost:5001/api/PathFinder/FindPath",
        JSON.parse("[" + this.state.pathFinderInput + "]"),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => this.setState({ pathFinderResponse: res.data }))
      .catch(err => {
        this.setState({ pathFinderResponse: 'Request failed' });
        console.log(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
          <input
            type="text"
            name="pathFinderInput"
            style={{ flex: "10", padding: "5px" }}
            placeholder="Input array for path finder"
            value={this.state.pathFinderInput}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value={"Submit"}
            className="btn"
            style={{ flex: "1" }}
            disabled={this.state.invalidInput}
          />
        </form>
        <p>{JSON.stringify(this.state.pathFinderResponse)}</p>
      </React.Fragment>
    );
  }
}

export default Pathfinder;
