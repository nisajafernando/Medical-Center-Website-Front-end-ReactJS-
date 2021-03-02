import React, { Component } from 'react';

import axios from "axios";
 


class ViewAppointmentComponent extends Component {


    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            email:'',
            phone:'',
            illness:'',
            doctor:'',
            date:''
            

        }
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

 


    render() {
        return (
            <div>
                 <div className= "card col-md-6 offset md-3">
                     <h3 className="text-center"> Lab Report </h3>
                                <div className="card-body">
                                    <form>
                                    <div className="row"></div>
                                     
                                    <b>Lab ID</b>
                        <div>{this.state.id}</div>
      
                        <b>Lab Test</b> 
                        <div>{this.state.name}</div>
      
                        <b>Test Result</b> 
                        <div>{this.state.email}</div>
      
                        <b>Patient</b> 
                        <div>{this.state.phone}</div>
      
                        <b>Gender</b> 
                        <div>{this.state.illness}</div>
      
                        <b>Consultant</b> 
                        <div>{this.state.doctor}</div>
      
                        <b>Date</b> 
                        <div>{this.state.date}</div>
      
                        
                    
                        <button  onClick={() => window.print()} className="btn btn-info"  style={{ marginTop: "30px", marginLeft:"380px"}}>GENERATE PDF</button>                       
      
      
                    </form>
                  </div>                
                 </div>
            </div>
        );
    }
}

export default ViewAppointmentComponent;