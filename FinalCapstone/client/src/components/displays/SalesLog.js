import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';

export const SaleLog = ({ sale }) => {


    let momentDate = moment(sale.date);
    let formattedDate = momentDate.utc().format("MM/DD/YYYY");
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <>
            <tr>

                <td>{formattedDate}</td>
                <td>{sale.product}</td>
                <td>{sale.closes}</td>
                <td>${sale.commission}</td>
                <td><Button className="blue" >Edit</Button> <Button className="red">Delete</Button></td>
            </tr>

            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>{formattedDate}</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this entry?
  </ModalBody>
                <ModalFooter>
                    <Button className="red" onClick={toggle}>Delete</Button>
                    <Button className="blue" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>

    )
}