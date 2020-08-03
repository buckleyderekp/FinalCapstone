import React, { useState, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import { SaleContext } from "../providers/SaleProvider";

export const SaleLog = ({ sale }) => {

    const { deleteSaleById } = useContext(SaleContext)
    let momentDate = moment(sale.date);
    let formattedDate = momentDate.utc().format("MM/DD/YYYY");
    const [saleModal, setSaleModal] = useState(false);
    const saleToggle = () => setSaleModal(!saleModal);
    const deleteEntry = () => {
        deleteSaleById(sale.id).then(saleToggle)
    }

    return (
        <>
            <tr>

                <td>{formattedDate}</td>
                <td>{sale.product.productName}</td>
                <td>{sale.closes}</td>
                <td>${sale.commission}</td>
                <td><Button className="blue" >Edit</Button> <Button className="red" onClick={saleToggle}>Delete</Button></td>
            </tr>

            <Modal isOpen={saleModal} toggle={saleToggle} >
                <ModalHeader toggle={saleToggle}>{formattedDate}</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this entry?
  </ModalBody>
                <ModalFooter>
                    <Button className="red" onClick={deleteEntry}>Delete</Button>
                    <Button className="blue" onClick={saleToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>

    )
}