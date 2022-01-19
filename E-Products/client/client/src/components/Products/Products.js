import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../Redux/Actions/Products/productaction';
import Loading from '../Loading/Loading';

const Products = () => {
 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const Productslist = useSelector(state => state.Productslist);
  const { products, loading } = Productslist;
  console.log("productslist", Productslist);
  console.log("products", (products));
  

  return (
    <div>
      {loading && <Loading />}
      {products !== undefined && products.length === 0 ? (
        'No Product has been added yet'
      ) : (
        <div className='row'>
          <div className='col'>
            <table className='table table-hover'>
              <thead>
                  <tr>
                  <th scope='col'>Product Id</th>
                  <th scope='col'>Product Name</th>
                  <th scope='col'>Product Note</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Offer Price</th>
                  <th scope='col'>Cust Id</th>
                </tr>
              </thead>

              <tbody>
                {products &&
                  products.recordset.map(product => {
                  
                    return (
                      <tr className='table-dark' key={product.productId}>
                        <td>{ product.productId}</td>
                        <td>{product.productname}</td>
                        <td>{product.productnote}</td>
                        <td>{product.price}</td>
                        <td>{product.Discount}</td>
                        <td>{product.custId}</td>
                        
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div> 
       )}
    </div>
  );
};

export default Products;
