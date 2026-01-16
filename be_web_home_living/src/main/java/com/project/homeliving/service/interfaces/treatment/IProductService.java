package com.project.homeliving.service.interfaces.treatment;

import com.project.homeliving.dto.treatment.ProductRequest;
import com.project.homeliving.dto.treatment.ProductResponse;
import com.project.homeliving.dto.treatment.ProductSearch;
import com.project.homeliving.entity.product.Product;
import org.springframework.data.domain.Page;

public interface IProductService {
    Product findById(Long id);
    ProductResponse detail(Long id);
    Page<ProductResponse> search(ProductSearch search);

    ProductResponse create(ProductRequest request);
    ProductResponse update(Long id,ProductRequest request);

    void delete(Long id);
}
