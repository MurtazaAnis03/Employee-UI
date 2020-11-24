import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

class EmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            employees: []
        }

        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((response) => {
            this.setState({employees: response.data});
        });
    }

    addEmployee(){
        this.props.history.push(`/add-employee/_add`);
    }

    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then(response => {
          this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});  
        });
    }

    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }

    render() {

        const columns = [
            {
                Header: 'ID',
                accessor: 'id',
                filterable: true
            },
            {
                Header: 'NAME',
                accessor: 'name',
                filterable: true
            },
            {
                Header: 'SALARY',
                accessor: 'salary',
            },
            {
                Header: 'Is PARMANENT',
                accessor: 'is_parmanent',
            },
            {
                Header: 'DESIGNATION',
                accessor: 'designation',
                filterable: true
            },
            {
                Header: 'ACTION',
                Cell: props => {
                    return (
                        <button onClick={() => this.editEmployee(props.original.id)} className="btn btn-info">Update</button>
                    )
                },
                filterable: false
            },
            {
                Header: 'ACTION',
                Cell: props => {
                    return (
                        <button style={{marginLeft: "10px"}} onClick={() => this.deleteEmployee(props.original.id)} className="btn btn-danger">Delete</button>
                    )
                },
                filterable: false
            },
            {
                Header: 'ACTION',
                Cell: props => {
                    return (
                        <button style={{marginLeft: "10px"}} onClick={() => this.viewEmployee(props.original.id)} className="btn btn-info">View</button>
                    )
                },
                filterable: false
            }
        ]

        return (
            <div>
                <h2 className = "text-center">Employees List</h2>
                <div className = "row">
                    <button className = "btn btn-primary" onClick = {this.addEmployee }>Add Employee</button>
                </div>
                <br/><br/>
                <ReactTable className = "table table-striped table-bordered"
                    data={this.state.employees} 
                    columns={columns}
                    defaultPageSize={10}>
                </ReactTable>
            </div>
        );
    }
}

export default EmployeeComponent;