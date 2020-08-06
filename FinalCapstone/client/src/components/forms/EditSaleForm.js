import React, { useContext, useEffect } from "react";
import { FormGroup, Label, Input, Col } from 'reactstrap';
import { ProductContext } from "../providers/ProductProvider";


export const EditSaleForm = ({ handleUserEdit, sale }) => {

    const { products, getProducts } = useContext(ProductContext)


    useEffect(() => {
        getProducts()
    }, []);

    return (
        <>
            <div className="form-group">
                <FormGroup>
                    <Label for="product">Select</Label>
                    <Input defaultValue={sale.productId} onChange={handleUserEdit} type="select" name="select" id="productId">
                        <option key="0" value="0">Please Select Product</option>
                        {products.map(p => {
                            return <option key={p.id} value={p.id}>{p.productName}</option>
                        })}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="commission">Commission</Label>
                    <Input defaultValue={sale.commission} onChange={handleUserEdit} type="text" name="text" id="commission" required />
                </FormGroup>
                <FormGroup>
                    <Label for="closes">Number of Closing Attempts</Label>
                    <Input defaultValue={sale.closes} onChange={handleUserEdit} type="text" name="text" id="closes" required />
                </FormGroup>
                <FormGroup>
                    <Label for="date">Date</Label>
                    <Input
                        onChange={handleUserEdit}
                        type="date"
                        name="date"
                        id="date"
                        placeholder="date placeholder"
                        required
                    />
                </FormGroup>
            </div>
        </>
    )
}