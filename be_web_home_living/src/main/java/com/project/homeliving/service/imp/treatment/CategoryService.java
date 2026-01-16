package com.project.homeliving.service.imp.treatment;

import com.project.homeliving.dto.treatment.CategoryRequest;
import com.project.homeliving.dto.treatment.CategoryResponse;
import com.project.homeliving.dto.treatment.CategorySearch;
import com.project.homeliving.entity.product.Category;
import com.project.homeliving.exception.AppException;
import com.project.homeliving.exception.ErrorCode;
import com.project.homeliving.repository.product.ICategoryRepository;
import com.project.homeliving.service.interfaces.treatment.ICategoryService;
import com.project.homeliving.util.ObjectMapperUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {
    private final ICategoryRepository categoryRepository;

    @Override
    public Category findById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        if(Boolean.TRUE.equals(category.getIsDelete()))
            throw new AppException(ErrorCode.CATEGORY_NOT_FOUND);
        return category;
    }

    @Override
    public CategoryResponse detail(Long id) {
        var entity = this.findById(id);
        return ObjectMapperUtils.map(entity, CategoryResponse.class);
    }

    @Override
    public Page<CategoryResponse> search(CategorySearch search) {
        Pageable pageable = PageRequest.of(search.getPage() - 1,
                search.getLimit());

        Page<CategoryResponse> categoryResponses = categoryRepository.search(search.getKeyword(),
                search.getCategoryType(), pageable)
                .map(it -> ObjectMapperUtils.map(it, CategoryResponse.class));

        return categoryResponses;
    }

    @Override
    public CategoryResponse create(CategoryRequest request) {
        Category category = ObjectMapperUtils.map(request, Category.class);
        return ObjectMapperUtils.map(categoryRepository.save(category), CategoryResponse.class);
    }

    @Override
    public CategoryResponse update(Long id, CategoryRequest request) {
        Category category = this.findById(id);
        category.setName(request.getName());

        return ObjectMapperUtils.map(categoryRepository.save(category), CategoryResponse.class);
    }

    @Override
    public void delete(Long id) {
        Category category = this.findById(id);

        if (categoryRepository.hasActiveProducts(id)) {
            throw new AppException(ErrorCode.CANNOT_DELETE_CATEGORY_HAS_PRODUCTS);
        }

        category.setIsDelete(true);
        categoryRepository.save(category);
    }
}
