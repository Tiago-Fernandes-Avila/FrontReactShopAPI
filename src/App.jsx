import { useEffect, useState } from 'react';
import './App.css';
import { Product } from './Classes/ProductClass';

import ListProducts from './components/ListProducts';

const App = () => {
  const [nomeProd, setNomeProd] = useState('');
  const [priceProd, setPriceProd] = useState(0);
  const [descriptionProd, setDescriptionProd] = useState('');
  const [imgUrlProd, setImgUrlProd] = useState('');

  function handleName(event) {
    setNomeProd(event.target.value);
  }

  function handlePrice(event) {
    setPriceProd(parseFloat(event.target.value));
  }

  function handleDesc(event) {
    setDescriptionProd(event.target.value);
  }

  function handleImgUrl(event) {
    setImgUrlProd(event.target.value);
  }

  function submitProduct(event) {
    event.preventDefault(); // Impede o reload da página

    const prod = {
     name: nomeProd, 
     price : priceProd, 
     description: descriptionProd, 
     imgUrl : imgUrlProd
    };
 
    fetch('http://localhost:8080/products/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prod)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erro na requisição!");
        }
      })
      .then(data => {
        console.log("Produto cadastrado com sucesso:", data);
      })
      .catch(error => {
        console.error("Erro ao cadastrar produto:", error);
      });
      alert("Ação efetuada!")
      setNomeProd('')
      setPriceProd(0)
      setDescriptionProd('')
      setImgUrlProd('')
      const form = document.getElementById('form1');
      form.reset();
     
    }


     

      



  

  return (
    <>
      <h1>Gestão de produtos</h1>
      <form onSubmit={submitProduct} id='form1'>
        <input
          className="input"
          type="text"
          placeholder="Nome:"
        required  onChange={handleName}
        />

        <input
          className="input"
          type="number"
          placeholder="Preço:"
          onChange={handlePrice}
        required/>

        <input
          className="input"
          type="text"
          placeholder="Descrição:"
          required onChange={handleDesc}
        />

        <input
          className="input"
          type="text"
          placeholder="ImgUrl:"
         required  onChange={handleImgUrl}
        /> <br />

        <button type="submit">
          Cadastrar
        </button>
      </form>

      <h2>nome: {nomeProd}, <br/> price: {priceProd}</h2>
       <ListProducts/>
    </>
  );
};

export default App;
