package com.sleepingguard.service;

import com.sleepingguard.dto.OrderRequest;
import com.sleepingguard.dto.OrderResponse;
import com.sleepingguard.entity.Order;
import com.sleepingguard.entity.User;
import com.sleepingguard.repository.OrderRepository;
import com.sleepingguard.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public OrderResponse createOrder(OrderRequest request) {
        User user = userRepository.findById(request.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order(null, user, request.getSubscriptionCount(), 
            request.getPhysicalKeyCount(), "PENDING", LocalDateTime.now());
        
        return mapToResponse(orderRepository.save(order));
    }

    public List<OrderResponse> getUserOrders(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return orderRepository.findByUserOrderByCreatedAtDesc(user)
            .stream()
            .map(this::mapToResponse)
            .toList();
    }

    private OrderResponse mapToResponse(Order order) {
        return new OrderResponse(order.getId(), order.getUser().getId(),
            order.getUser().getLogin(), order.getUser().getCompanyName(),
            order.getSubscriptionCount(), order.getPhysicalKeyCount(),
            order.getStatus(), order.getCreatedAt());
    }
}
