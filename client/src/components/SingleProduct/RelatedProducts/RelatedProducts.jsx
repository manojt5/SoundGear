import Products from "../../Products/Products"
import useFetch from "../../../hooks/useFetch";
const RelatedProducts = ({productid,categoryid}) => {
    const {data}=useFetch(`/api/products?populate=*&filters[id][$ne]=${productid}&filters[categories][id]=${categoryid}&pagination[start]=0&pagination[limit]=4`)
    return <div className="Related-Products">
        <Products headingText={"Related Products"} products={data}/>
    </div>;
};

export default RelatedProducts;
