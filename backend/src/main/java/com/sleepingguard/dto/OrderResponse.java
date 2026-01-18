package com.sleepingguard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private Long userId;
    private String userLogin;
    private String companyName;
    private Integer subscriptionCount;
    private Integer physicalKeyCount;
    private String status;
    private LocalDateTime createdAt;
}
