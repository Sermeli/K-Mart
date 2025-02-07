import SHOP_DATA from '../../shop-data.json'

import { useContext } from 'react';

import { ProductContext } from '../../contexts/products.context';
import ProductCard from '../../components/product-card/product-card.component';

import '../shop/shop.styles.scss';

const Shop = () => {

    return (
        <div className='products-container'>
            {SHOP_DATA.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )

};

export default Shop;