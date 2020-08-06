import React, { useContext, useEffect } from "react";
import { FormGroup, Label, Input, Col } from 'reactstrap';
import { ProductContext } from "../providers/ProductProvider";


export const AddSaleForm = ({ handleUserInput }) => {

    const { products, getProducts } = useContext(ProductContext)

    useEffect(() => {
        getProducts()
    }, []);

    return (
        <>
            <div className="form-group">

                <FormGroup>
                    <Label for="product">Select</Label>
                    <Input onChange={handleUserInput} type="select" name="select" id="ProductId">
                        <option key="0" value="0">Please Select Product</option>
                        {products.map(p => {
                            return <option key={p.id} value={p.id}>{p.productName}</option>
                        })}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="commission">Commission</Label>
                    <Input onChange={handleUserInput} type="text" name="text" id="Commission" required />
                </FormGroup>
                <FormGroup>
                    <Label for="closes">Number of Closing Attempts</Label>
                    <Input onChange={handleUserInput} type="text" name="text" id="Closes" required />
                </FormGroup>
                <FormGroup>
                    <Label for="date">Date</Label>
                    <Input
                        onChange={handleUserInput}
                        type="date"
                        name="date"
                        id="Date"
                        placeholder="date placeholder"
                        required
                    />
                </FormGroup>
            </div>
        </>
    )
}