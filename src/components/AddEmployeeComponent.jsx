import React, { Component } from 'react';
import S3FileUpload from 'react-s3';
import EmployeeService from '../services/EmployeeService';

const config = {
    bucketName: 'employee-project-image-upload',
    dirName: 'photos', /* optional */
    region: 'ap-south-1',
    accessKeyId: 'key',
    secretAccessKey: 'key',
}

class AddEmployeeComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            employee: {
                id: this.props.match.params.id,
                name: '',
                salary: 0,
                dateOfJoining: '',
                isParmanent: null,
                designation: '',
                profilePic: '',
                resume: ''
            }
            
        }
        
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        this.changeDojHandler = this.changeDojHandler.bind(this);
        this.changeParmanentHandler = this.changeParmanentHandler.bind(this);
        this.changeDesignationHandler = this.changeDesignationHandler.bind(this);
        this.uploadProfileHandler = this.uploadProfileHandler.bind(this);
        this.uploadResumeHandler = this.uploadResumeHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            return 
        }
        else{
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
    }

    saveEmployee = (e) => {
        e.preventDefault();
        let employee = {name: this.state.name, salary: this.state.salary, dateOfJoining: this.state.dateOfJoining, isParmanent: this.state.isParmanent, designation: this.state.designation, profilePic: this.state.profilePic, resume: this.state.resume};
        console.log('employee => ' + JSON.stringify(employee));

        if(this.state.id === '_add'){
            EmployeeService.addEmployee(employee).then(response => {
                this.props.history.push('/employees');
            });
        }
        else{
            EmployeeService.updateEmployee(employee, this.state.id).then(response => {
                this.props.history.push('/employees');
            });
        }
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
        if(event.target.value === "yes"){
            this.setState({isParmanent: true})
        }
        else if(event.target.value === "no"){
            this.setState({isParmanent: false})
        }
        this.setState({isParmanent: event.target.value});
    }

    changeDesignationHandler = (event) => {
        this.setState({designation: event.target.value});
    }

    uploadProfileHandler = (event) => {
        console.log(event.target.files[0]);
        S3FileUpload.uploadFile(event.target.files[0], config)
            .then(response => {
                return response.result.url + response.key
            }).then(result => {
                console.log(result)
                var emp = {...this.state.employee}
                emp.profilePic = result
                this.setState({employee: emp})
            })
            .catch(err => console.log(err))
    }

    uploadResumeHandler = (event) => {
        console.log(event.target.files[0]);
        S3FileUpload.uploadFile(event.target.files[0], config)
            .then(response => {
                return response.result.url + response.key
            }).then(result => {
                console.log(result)
                var emp = {...this.state.employee}
                emp.resume = result
                this.setState({employee: emp})
            })
            .catch(err => console.log(err))
    }

    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className = "text-center">Add Employee</h3>
        }
        else{
            return <h3 className = "text-center">Update Employee</h3>
        }
    }

    render() {
        return (
            <div>
            <br/>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
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
                                        <label>Is_Parmanent:
                                        <br/> 
                                        <input type="radio" name="isParmanent"  value="true" onChange={this.changeParmanentHandler} /> Yes
                                        <br/>
                                        <input type="radio" name="isParmanent"  value="false" onChange={this.changeParmanentHandler} /> No
                                        </label>
                                    </div>

                                    <div className = "form-group">
                                        <label>Designation: </label>
                                        <input placeholder ="Designation" name="designation" className="form-control" value={this.state.designation} onChange={this.changeDesignationHandler} />
                                    </div>

                                    <div className = "form-group">
                                        <label>Profile Pic: </label>
                                        <input type="file"  value={this.state.profilePic} onChange={this.uploadProfileHandler} />
                                    </div>

                                    <div className = "form-group">
                                        <label>Resume: </label>
                                        <input type="file" value={this.state.resume} onChange={this.uploadResumeHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveEmployee} >Save</button>
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

export default AddEmployeeComponent;