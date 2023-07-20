import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import Loader from "../components/Loader.jsx";
import {Link, useNavigate} from "react-router-dom";
import FormContainer from "../components/FormContainer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {saveShippingAddress} from "../slices/cartSlice.js";
import {toast} from "react-toastify";
import CheckoutSteps from "../components/CheckoutSteps.jsx";

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country}))
        toast.success('Sucessful')
        navigate('/payment')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your City'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your Postal Code'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;