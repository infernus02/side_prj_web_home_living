package com.project.homeliving.service.interfaces.treatment;

import com.project.homeliving.dto.treatment.CategoryRequest;
import com.project.homeliving.dto.treatment.CategoryResponse;
import com.project.homeliving.dto.treatment.CategorySearch;
import com.project.homeliving.entity.product.Category;
import org.springframework.data.domain.Page;

public interface ICategoryService {
    Category findById(Long id);
    CategoryResponse detail(Long id);
    Page<CategoryResponse> search(CategorySearch search);

    CategoryResponse create(CategoryRequest request);
    CategoryResponse update(Long id,CategoryRequest request);

    void delete(Long id);
}
