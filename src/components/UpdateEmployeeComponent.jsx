import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class UpdateEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            salary: '',
            dateOfJoining: '',
            isParmanent: '',
            designation: '',
            profilePic: '',
            resume: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        this.changeDojHandler = this.changeDojHandler.bind(this);
        this.changeParmanentHandler = this.changeParmanentHandler.bind(this);
        this.changeDesignationHandler = this.changeDesignationHandler.bind(this);
        this.changeProfileHandler = this.changeProfileHandler.bind(this);
        this.changeResumeHandler = this.changeResumeHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then(response => {
            let employee = response.data;
            this.setState({name: employee.name,
                salary: employee.salary,
                dateOfJoining: employee.dateOfJoining,
                isParmanent: employee.isParmanent,
                designation: employee.designation,
                profilePic: employee.profilePic,
                resume: employee.resume
            });
        });
    }

    updateEmployee = (e) => {
        e.preventDefault();
        let employee = {name: this.state.name, salary: this.state.salary, dateOfJoining: this.state.dateOfJoining, isParmanent: this.state.isParmanent, designation: this.state.designation, profilePic: this.state.profilePic, resume: this.state.resume};
        console.log('employee => ' + JSON.stringify(employee));
        console.log('id => ' + JSON.stringify(this.state.id));

        EmployeeService.updateEmployee(employee, this.state.id).then(response => {
            this.props.history.push('/employees');
        });

    }

    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }

    changeSalaryHandler = (event) => {
        this.setState({salary: event.target.value});
    }

    changeDojHandler = (event) => {
        this.setState({dateOfJoining: event.target.value});
    }

    changeParmanentHandler = (event) => {
        this.setState({isParmanent: event.target.value});
    }

    changeDesignationHandler = (event) => {
        this.setState({designation: event.target.value});
    }

    changeProfileHandler = (event) => {
        this.setState({profilePic: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    render() {
        return (
            <div>
            <br/><br/>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className = "text-center">Update Employee</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label>Name: </label>
                                        <input placeholder ="Full Name" name="name" className="form-control" value={this.state.name} onChange={this.changeNameHandler} />
                                    </div>

                                    <div className = "form-group">
                                        <label>Salary: </label>
                                        <input placeholder ="Salary" name="salary" className="form-control" value={this.state.salary} onChange={this.changeSalaryHandler} />
                                    </div>

                                    <div className = "form-group">
                                        <label>Date of Joining: </label>
                                        <input type="date" placeholder ="Date of Joining" name="dateOfJoining" className="form-control" value={this.state.dateOfJoining} onChange={this.changeDojHandler} />
                                    </div>

                                    <div className = "form-group">
                                        <label>is_Parmanent: </label>
                                        <input placeholder ="Yes/No" name="isParmanent" className="form-control" value={this.state.isParmanent} onChange={this.changeParmanentHandler} />
                                    </div>

                                    <div className = "form-group">
                                        <label>Designation: </label>
                                        <input placeholder ="Designation" name="designation" className="form-control" value={this.state.designation} onChange={this.changeDesignationHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.updateEmployee} >Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateEmployeeComponent;