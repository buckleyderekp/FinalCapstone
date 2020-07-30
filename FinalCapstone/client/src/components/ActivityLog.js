import React, { useContext } from "react";
import { Table } from 'reactstrap';
import "./ActivityLog.css"


export const AcitivyLog = () => {



    return (
        <>
            <h3 className="title--activityLog">Activity Log</h3>
            <div className="container">
                <div className="activityTitle callLog">Call Log</div>
                <div className="activityContainer callLog">    <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table></div>
                <div className="activityTitle appointmentLog">Appointment Log</div>
                <div className="activityContainer appointmentLog">Appointment Log</div>
                <div className="activityTitle salesLog">Sales Log</div>
                <div className="activityContainer salesLog">Sales Log</div>
            </div>
        </>

    )

}