import FormProduct from '@components/FormProduct';
import React, { useEffect, useState } from 'react';
import { useRouter, } from 'next/router';
import axios from 'axios'; //Se usa axios para hacer las peticiones
import endPoints from '@services/api';

export default function edit() {
    const [product, setProduct] = useState({});
    const router = useRouter();

    useEffect(()=> {
        const { id } = router.query; 
        if(!router.isReady) return;
        console.log(id);
        async function getProduct(){
            const response = await axios.get(endPoints.products.getProduct(id));
            setProduct(response.data);
        }
        getProduct();
    }, [router?.isReady]);
  return <FormProduct  product={product}/>;
}
