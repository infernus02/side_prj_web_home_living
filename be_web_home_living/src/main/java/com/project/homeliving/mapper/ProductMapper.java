package com.project.homeliving.mapper;

import com.project.homeliving.dto.treatment.ProductResponse;
import com.project.homeliving.entity.product.Product;
import com.project.homeliving.util.ObjectMapperUtils;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {
    public ProductResponse toResponse (Product product){
        ProductResponse response = ObjectMapperUtils.map(product, ProductResponse.class);
        response.setCategoryId(product.getCategory().getId());
        response.setCategoryName(product.getCategory().getName());
        response.setAverageRating(product.getAverageRating());
        return  response;
    }
}
