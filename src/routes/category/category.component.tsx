import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';
import { SingleCategoryContainer, CategoryTitle} from './category.styles';

type CategoryRouteParams = {
    category: string;
}

const Category = () => {
    const { category } = useParams<
        keyof CategoryRouteParams
    >() as CategoryRouteParams;
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
                { isLoading ? (
                    <Spinner /> 
                ) : (
                    <SingleCategoryContainer>
                        {products && products.map((product) => (
                            <ProductCard key={product.id} product={product}/>
                        ))}
                    </SingleCategoryContainer>
                )}
        </Fragment>
    )
}

export default Category;