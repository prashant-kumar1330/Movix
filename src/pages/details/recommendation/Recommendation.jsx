import React from "react";


import Carousel from "../../../componensts/carousel/Carousel"
import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../../componensts/contentWrapper/ContentWrapper";

const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );

    return (
      
        <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default Recommendation;