import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  Buy,
} from "../../styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

export default function ProductDetails() {
  const { query } = useRouter();
  //Fetch graphQL data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });

  const { data, fetching, error } = results;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Whoops !</p>;
  //Extract our data

  const { title, description, image } = data.products.data[0].attributes;

  return (
    <DetailsStyle>
      <img src={image.data.attributes.formats.small.url} alt={title} />
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>
        <Quantity>
          <span>Quantity</span>
          <button>
            <AiFillMinusCircle />
          </button>
          <p>0</p>
          <button>
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <Buy>Add to cart</Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}
