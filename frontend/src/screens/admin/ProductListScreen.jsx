import {useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery} from "../../slices/productApiSlice.js";
import {Button, Col, Row, Table} from "react-bootstrap";
import {FaEdit, FaTrash} from "react-icons/fa";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import {LinkContainer} from "react-router-bootstrap";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import Paginate from "../../components/Paginate.jsx";

const ProductListScreen = () => {
    const {pageNumber} = useParams()
    const { data, isLoading, refetch, error } = useGetProductsQuery({ pageNumber })

    const [deleteProduct, {isLoading: loadingDelete} ]  = useDeleteProductMutation()

    const deleteHandler = async (id) => {
        if(window.confirm('Are you sure you want to delete this product?')){
            try{
                await deleteProduct(id)
                refetch()
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    const [createProduct, {isLoading: loadingCreate} ]  = useCreateProductMutation()
    const createProductHandler = async() => {
        if(window.confirm('Are you sure you want to create a new product?')){
            try{
                await createProduct()
                refetch()
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }


    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='btn-sm m-3' onClick={ createProductHandler}>
                        <FaEdit /> Create Product
                    </Button>
                </Col>
            </Row>
            { loadingCreate && <Loader />}
            { loadingDelete && <Loader />}

            { isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                        <tr>
                            <td>ID</td>
                            <td>NAME</td>
                            <td>CATEGORY</td>
                            <td>BRAND</td>
                            <td>PRICE</td>
                            <td>ACTIONS</td>
                        </tr>
                        </thead>
                        <tbody>
                        {data.products && data.products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>{product.price}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm mx-2'>
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                        <FaTrash style={{color: 'white'}} />
                                    </Button>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </Table>
                    <Paginate pages={data.pages} page={data.page} isAdmin={true} />
                </>
            ) }
        </>
    );
};

export default ProductListScreen;