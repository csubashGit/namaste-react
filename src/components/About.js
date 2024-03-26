import User from './User'
import UserClass from '../UserClass';
import { Component } from 'react';

class About extends Component{
    constructor(props){
        super(props);
        console.log("Parent Constructor");
    }

    componentDidMount(){
        console.log("Parent Component Did Mount");
    }

    render(){
        console.log("Parent Render");
        return (
            <div>
                <h1>About</h1>
                <UserClass name={"Subash from UserClass"} location={"Hyderabad Class"}/>
            </div>
        );
    }
}
export default About

