import React from "react";
import './index.css'
export default class Company extends React.Component{
    render(){
        return(
            <div className="company-container">  
            <h1>Comapany Information</h1>
               <p><strong>Company:</strong> Geeksynergy Technologies Pvt Ltd</p>
               <p><strong>Address:</strong> Sanajayanagar, Bengaluru-56</p>
               <p><strong>Phone:</strong>XXXXXXXX09</p>               
               <p><strong>Email:</strong> XXXXX@gmail.com</p>
            </div>
        )
    }
}