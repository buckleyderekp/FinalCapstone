import React, { useState, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import { SaleContext } from "../providers/SaleProvider";
import { EditSaleForm } from "../forms/EditSaleForm";

export const SaleLog = ({ sale }) => {

    const { deleteSaleById, editSale } = useContext(SaleContext)
    let momentDate = moment(sale.date);
    let formattedDate = momentDate.utc().format("MM/DD/YYYY");
    const [saleModal, setSaleModal] = useState(false);
    const saleToggle = () => setSaleModal(!saleModal);
    const deleteEntry = () => {
        deleteSaleById(sale.id).then(saleToggle)
    }

    const [editModal, setEditModal] = useState(false);
    const editToggle = () => setEditModal(!editModal);


    const [userEdit, setUserEdit] = useState(null);
    const handleUserEdit = (e) => {
        const updatedState = { ...userEdit }
        updatedState[e.target.id] = e.target.value
        setUserEdit(updatedState);
    };

    const editSubmit = () => {
        if (userEdit != sale) {
            editSale(userEdit).then(editToggle)
        }
        else {
            editToggle()
        }
    }


    return (
        <>
            <tr>

                <td>{formattedDate}</td>
                <td>{sale.product.productName}</td>
                <td>{sale.closes}</td>
                <td>${sale.commission}</td>
                <td><Button className="blue" onClick={() => {
                    editToggle()
                    setUserEdit(sale)
                }}
                >Edit</Button> <Button className="red" onClick={saleToggle}>Delete</Button></td>
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
            <Modal isOpen={editModal} editToggle={editToggle} >
                <ModalHeader editToggle={editToggle}>{formattedDate}</ModalHeader>
                <ModalBody>
                    <EditSaleForm sale={sale} handleUserEdit={handleUserEdit} />
                </ModalBody>
                <ModalFooter>
                    <Button className="red" onClick={editSubmit}>Submit</Button>
                    <Button className="blue" onClick={editToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>

    )
}