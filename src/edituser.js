import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from './loading';


function EditUser(props) {
    console.log(props.match.params.id);


    const [userName, setUserName] = useState("");
    const [position, setPosition] = useState("");
    const [office, setOffice] = useState("");
    const [startDate, setStartDate] = useState("");
    const [salary, setSalary] = useState("");

    const [isLoading,setIsLoading]=useState(false); // to show loading till data gets fetched from server

    
    const history = useHistory(); //calling useHistory function for redirection to other component

    useEffect(async ()=>{
        //this code will executed when it entered into this component
        //we have user id, get user data by id and populate in form

        let userData = await axios.get(`https://60efffc1f587af00179d3c21.mockapi.io/user/${props.match.params.id}`);
        console.log(userData);
        setUserName(userData.data.userName);
        setPosition(userData.data.position);
        setOffice(userData.data.office);
        setStartDate(userData.data.startDate);
        setSalary(userData.data.salary);

    },[])
    
    let handleSubmit =  async (e) => {
        e.preventDefault();//prevant default will stop auto submitting the form
        
        try {
            let userData = {userName,position,office,startDate,salary}; //destructured way of obj declaration only if keys should match object variable
            let users = await axios.put(`https://60efffc1f587af00179d3c21.mockapi.io/user/${props.match.params.id}`,userData);
            console.log(users.data);
            setIsLoading(true);
            
        } catch (error) {
            console.log(error);
            setIsLoading(false);    
        }

        isLoading ? <Loading></Loading> :  history.push("/user") //redirection command to users component
    }


    return (
        <div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Edit User</h1>
            </div>

            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-lg-6 mt-2">
                            <label>User Name</label>
                            <input type="text" value={userName} onChange={(e)=>{setUserName(e.target.value)}} className="form-control" />
                        </div>
                        <div className="col-lg-6 mt-2">
                            <label>Position</label>
                            <input type="text" value={position} onChange={(e)=>{setPosition(e.target.value)}} className="form-control" />
                        </div>
                        <div className="col-lg-6 mt-2">
                            <label>Office</label>
                            <input type="text" value={office} onChange={(e)=>{setOffice(e.target.value)}} className="form-control" />
                        </div>
                        <div className="col-lg-6 mt-2">
                            <label>Start Date</label>
                            <input type="date" value={startDate} onChange={(e)=>{setStartDate(e.target.value)}} className="form-control" />
                        </div>
                        <div className="col-lg-6 mt-2">
                            <label>Salary</label>
                            <input type="text" value={salary} onChange={(e)=>{setSalary(e.target.value)}} className="form-control" />
                        </div>
                        <div className="col-lg-12 mt-2">
                            <input type="submit" value="Update" className="btn btn-primary"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>    
    );
}

export default EditUser
