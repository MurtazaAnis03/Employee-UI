import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddEmployeeComponent from './components/AddEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
import EmployeeComponent from './components/EmployeeComponent';

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Switch>

            <Route path = "/" exact component = {EmployeeComponent}></Route>
            <Route path = "/employees" component = {ListEmployeeComponent}></Route>
            <Route path = "/add-employee/:id" component = {AddEmployeeComponent}></Route>
            {/*<Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route>*/}
            <Route path = "/view-employee/:id" component = {ViewEmployeeComponent}></Route>

          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
