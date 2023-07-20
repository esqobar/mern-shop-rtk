import {useEffect, useState} from "react";
import FormContainer from "../components/FormContainer.jsx";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setCredentials} from "../slices/authSlice.js";
import Loader from "../components/Loader.jsx";
import {toast} from "react-toastify";
import {useRegisterMutation} from "../slices/userApiSlice.js";


const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('/');

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Your Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Your Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Re-Enter Your Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button disabled={isLoading} type='submit' variant='primary'>
                    Sign In
                </Button>

                {isLoading && <Loader />}
            </Form>

            <Row className='py-3'>
                <Col>
                    Already have an account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;