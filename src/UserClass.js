import React from "react"

class UserClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            UserInfo :{
                login:"Name of the User",
                id:"Default",
                avatar_url:"https://Google.com"
            }
        }
    }
async componentDidMount(){
    const data  = await fetch("https://api.github.com/users/csubashGit");
    const json  = await data.json();
    this.setState({
        UserInfo : json }
    )
}

    render () {
        const {login, id,avatar_url} = this.state.UserInfo;
        return (
            <div className="user-card">
                <img src = {avatar_url} />
                <h2>Name: {login}</h2>
                <h3>Location: {id}</h3>
                <h3>Contact: ranchoSubash</h3>
            </div>
        )
    }
}
export default  UserClass