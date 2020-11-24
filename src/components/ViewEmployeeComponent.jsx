import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ViewEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then(response => {
            this.setState({employee: response.data});
        });
    }

    render() {
        return (
            <div>
            <br/><br/>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">Employee Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <div style={{width: "58rem"}}><img src={this.state.employee.profilePic} alt="" height="200" width="200" className="img-thumbnail"/></div>
                        </div>
                    
                        <div className="row">
                            <label>Employee Name: </label>
                            <div>{this.state.employee.name}</div>
                        </div>
                        <div className="row">
                            <label>Employee Salary: </label>
                            <div>{this.state.employee.salary}</div>
                        </div>
                        <div className="row">
                            <label>Employee Date of Joining: </label>
                            <div>{this.state.employee.dateOfJoining}</div>
                        </div>
                        <div className="row">
                            <label>Employee is_Parmanent: </label>
                            <div>{this.state.employee.isParmanent}</div>
                        </div>
                        <div className="row">
                            <label>Employee Designation: </label>
                            <div>{this.state.employee.designation}</div>
                        </div>
                        <div className="row">
                            <label>Employee Resume: </label>
                            <div>
                                <div><a href={this.state.employee.resume}>resume</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewEmployeeComponent;