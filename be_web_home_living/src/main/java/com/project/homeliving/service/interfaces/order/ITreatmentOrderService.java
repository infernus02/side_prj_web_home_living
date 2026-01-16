package com.project.homeliving.service.interfaces.order;

import com.project.homeliving.dto.order.TreatmentOrderRequest;
import com.project.homeliving.dto.order.TreatmentOrderResponse;
import com.project.homeliving.dto.order.OrderSearch;
import org.springframework.data.domain.Page;

public interface ITreatmentOrderService {
    TreatmentOrderResponse detail(Long id);
    Page<TreatmentOrderResponse> search(OrderSearch search);
    TreatmentOrderResponse create(TreatmentOrderRequest request);
    TreatmentOrderResponse update(Long id, TreatmentOrderRequest request);
    void delete(Long id);
}
