import {useState, useEffect } from 'react';

import './ListProducts.css';


const ListProducts = () => {
 const [products, setProducts] = useState([]);



 useEffect( () => {
 
  fetch('http://localhost:8080/products')
  .then(response => response.json())
  .then(data => {
    setProducts(data); // <-- Aqui, 'data' já é um array de objetos 
  
  });
},[])

function findById(id) { //forma de pesquisar o produto

  const foundProduct = products.find(product => product.id == id);
  if (foundProduct) {
    console.log('O produto foi encontrado:', foundProduct);
    return foundProduct;
  } else {
    console.log('Produto não encontrado!');
    return null;
  }
}


    return <>
    
    
        <h1 className='comp'/>

        <table>
          <caption>Produtos</caption>
      <thead>
             <tr>
               <th scope="col">Nome</th>
               <th scope="col">Preço</th>
               <th scope="col">Description</th>
               <th>Imagem</th>
             </tr>

             {products.map(prod => <tr>
              
                                        <td>{prod.name}</td>
                                        <td>R${prod.price.toFixed(2) }</td>
                                        <td>{prod.description}</td>
                                        <td><img src={prod.urlImg} alt="" /></td>
                                  </tr>)}
      </thead>
        </table>
       
    </>
};

export default ListProducts;