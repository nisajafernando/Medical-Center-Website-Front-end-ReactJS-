import React from 'react';
import axios from "axios";
import * as moment from 'moment';
// import {BrowserRouter as Router, Route} from 'react-router-dom';
import ViewAppointmentComponent from './Components/ViewAppointmentComponent';
import { Component } from 'react';
 //import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


//import { Option } from '@material/react-select';

// function App() {
//   return (
//     <Router>
//          <AppRoute path = "/view-appointment/:id" component = {ViewAppointmentComponent} />
//    </Router>
//       );
//     }
 


const doctors = [
  { label: "Dr.Saman", value: 1 },
  { label: "Dr.Nimal", value: 2 },
  { label: "Dr.Kamal", value: 3 },
  { label: "Dr.Sumudu", value: 4 },
  { label: "Dr.John", value: 5 },
  { label: "Dr.Kumari", value: 6 },
  { label: "Dr.Jay", value: 7 }
];


function searchingFor(term){
  return function(x){
    return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
  }
}
class App extends React.Component {
    
  state = { value: 'pomsky' };

  constructor(props) {
    super(props);
    this.state = {
      // create a people property
      patients: [],
      id: 0,
      name: '',
      email: '',
      phone: '',
      illness: '',
      doctor: '',
      date: '',
      term:''


    }
    this.searchHandler= this.searchHandler.bind(this);


  }
  searchHandler(event){
    this.setState({term: event.target.value})

  }
  
  componentDidMount() {
    axios.get("http://localhost:8080/patients/")
      .then((res) => {
        this.setState({
          patients: res.data,
          id: 0,
          name: '',
          email: '',
          phone: '',
          illness: '',
          doctor: '',
          date: ''
        })
      })
  }
  submit(event, id) {
    alert('Your Booking Number Is: ' + Math.floor(Math.random() * Math.floor(10000)))
    //alert('You are About to do a booking the Patient No: ' + id )
    // alert('Your Booking Number Is: ' + id)
    event.preventDefault();
    if (id === 0) {
      axios.post("http://localhost:8080/patients/", {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        illness: this.state.illness,
        doctor: this.state.doctor,
        date: this.state.date
      })
        .then((res) => {
          this.componentDidMount();
        })
    } else {
      axios.put("http://localhost:8080/patients/", {
        id: this.state.id,
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        illness: this.state.illness,
        doctor: this.state.doctor,
        date: this.state.date
      }).then(() => {
        this.componentDidMount();
      })
 
    }

  }
  delete(id) {
    // alert('You are About to Delete the Patient No: ' + id)
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'About to Delete Id: '+ id + ' Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => axios.delete(`http://localhost:8080/patients/${id}`)
          .then(() => {
            this.componentDidMount();
          })
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
    
  }
  edit(id) { 
    // alert('You are About to Update the Patient No: ' + id )

    confirmAlert({
      title: 'Confirm to Update the Record',
      message: 'Are you sure to do this, You are about to update the id:' + id,
      buttons: [
        {
          label: 'Yes',
          onClick: () =>     axios.get(`http://localhost:8080/patients/${id}`)
          .then((res) => {
            console.log(res.data);
            this.setState({
              id: res.data.id, 
              name: res.data.name,
              email: res.data.email,
              phone: res.data.phone,
              illness: res.data.illness,
              doctor: res.data.doctor,
              date: res.data.date
            })
          })
        },
        {
          label: 'No',
          onClick: () => alert('Try Again')
        }
      ]
    });


  } 


  // view(id){

    
  //   onClick: () => <a href = "axios.get(`http://localhost:8080/patients/${id}`)"/>
  //   // onClick: () => axios.get(`http://localhost:8080/patients/${id}`)
   

  // }

  // print(id){
  //   axios.post(`http://localhost:8080/patients/${id}`)
  //   .then((res) => {
  //     console.log(res);
  //     console.log(res.data);
  //    this.render()
  //      return(
  //        <h2>View Appointment</h2>
  //      )
  //      }
  //   )
    
  // }

 
  render() {
    return (


      <div className="container" >
         
        <div className="row">
          <div className="col s6">
            <form onSubmit={(e) => this.submit(e, this.state.id)}>
              
               


              <div class="input-field col s12">
                <i class="material-icons prefix">person</i>
                <input onChange={(e) => this.setState({ name: e.target.value })} value={this.state.name} type="text" id="autocomplete-input" class="autocomplete" required />
                <label for="autocomplete-input">Enter Your Name</label>
              </div>
              <div class="input-field col s12">
                <i class="material-icons prefix">email</i>
                <input onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} type="email" id="autocomplete-input" class="autocomplete" required />
                <label for="autocomplete-input">Enter Your Email</label>
              </div>
              <div class="input-field col s12">
                <i class="material-icons prefix">phone</i>



                <input onChange={(e) => this.setState({ phone: e.target.value })} value={this.state.phone} type="text" max_length="10" id="autocomplete-input" class="autocomplete" required />
                <label for="autocomplete-input">Enter You Phone</label>


              </div>

              <div class="input-field col s12">
                <i class="material-icons prefix">mood_bad</i>
                <input onChange={(e) => this.setState({ illness: e.target.value })} value={this.state.illness} type="text" id="autocomplete-input" class="autocomplete" />
                <label for="autocomplete-input">Enter Your Illness </label>
              </div>

              <div class="input-field col s12">
                <i class="material-icons prefix">local_hospital</i>
                <input onChange={(e) => this.setState({ doctor: e.target.value })} value={this.state.doctor} type="text" id="autocomplete-input" class="autocomplete" required />

                <label for="autocomplete-input">Enter Your Doctor</label>
              </div>


              {/* <div class="input-field col s12">
                <i class="material-icons prefix">local_hospital</i>
                <div className="container">
                  <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                      <Select
                        label='Choose Dog'
                        value={this.state.doctor}
                        onChange={(e) => this.setState({ doctor: e.target.value })}
                      >
                        <Option value='pomsky'>Pomsky</Option>
                        <Option value='goldenDoodle'>Golden Doodle</Option>
                      </Select>
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                </div>
              </div> */}

              <div class="input-field col s12">
                <i class="material-icons prefix">date_range</i>
                <input onChange={(e) => this.setState({ date: e.target.value })} min={moment().format("YYYY-MM-DD")}  value={this.state.date} type="date" id="autocomplete-input" class="autocomplete" required />
                {/* <label for="autocomplete-input">Enter Your Date  YYYY/MM/DD</label> */}
              </div>
             

              


              <button class="btn waves-effect waves-light right" type="submit" name="action">Submit Your Appointment
          <i class="material-icons right">send</i>
              </button>
            </form>

          </div>
        
          <div className="col s6">
        
          <input type="text" placeHolder="Search Your Name Here"onChange={this.searchHandler}/>
            <table>
           
              <thead>
             
                <tr>
                 
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Illness</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Edit</th>
                  <th>Delete</th>
                  <th>Print</th>
                </tr>
              </thead>
              <tbody>
              

                { 

                  this.state.patients.filter(searchingFor(this.state.term)).map(user =>
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.illness}</td>
                      <td>{user.doctor}</td> 
                      <td>{user.date}</td>
                      <td>
                        <button onClick={(e) => this.edit(user.id)} class="btn waves-effect waves-light" type="submit" name="action">
                          <i class="material-icons">edit</i>
                        </button>
                      </td>
                      <td>
                        <button onClick={(e) => this.delete(user.id)} class="btn waves-effect waves-light" type="submit" name="action">
                          <i class="material-icons">delete</i>
                        </button>
                    
                </td> 
                {/* <td>
                        <button onClick={(e) =>this.view (user.id)} class="btn waves-effect waves-light" type="submit" name="action">
                          <i class="material-icons">print</i>
                        </button>
                    
                </td>  */}


                

                {/* <td>
                        <button onClick={(e) => this.print(user.id)} class="btn waves-effect waves-light" type="submit" name="action">
                          <i class="material-icons">Print</i>
                        </button>
                    
                </td> */}

                <td>
                        <button onClick={(e) => window.print(user.id)} class="btn waves-effect waves-light" type="submit" name="action">
                          <i class="material-icons">print</i>
                        </button>
                    
                </td>
                    </tr>
                  )
                }
                

              </tbody>
            </table>
          </div>

        </div>
      </div>

      
    );
  }
}

export default App;
