package com.project.homeliving.configuration.swagger;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    final String securitySchemeName = "bearerAuth";

    @Bean
    public OpenAPI apiInfo() {
        return new OpenAPI()
                .info(new Info()
                        .title("Lab1 API")
                        .description("Demo Spring Boot REST API dùng Swagger UI")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("name")
                                .email("email")
                                .url("https://myweb.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0.html"))
                )
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .name(securitySchemeName)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")));

    }

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("public-api")
                .pathsToMatch("/**") // match tất cả endpoint
                .build();
    }

    @Bean
    public GroupedOpenApi customerApi() {
        return GroupedOpenApi.builder()
                .group("customer-api")
                .pathsToMatch("/customers/**")
                .build();
    }

    @Bean
    public GroupedOpenApi categoryApi() {
        return GroupedOpenApi.builder()
                .group("category-api")
                .pathsToMatch("/categories/**")
                .build();
    }

    @Bean
    public GroupedOpenApi treatmaneApi() {
        return GroupedOpenApi.builder()
                .group("treatment-api")
                .pathsToMatch("/treatments/**")
                .build();
    }

    @Bean
    public GroupedOpenApi productApi() {
        return GroupedOpenApi.builder()
                .group("product-api")
                .pathsToMatch("/products/**")
                .build();
    }

    @Bean
    public GroupedOpenApi staffApi() {
        return GroupedOpenApi.builder()
                .group("staff-api")
                .pathsToMatch("/staffs/**")
                .build();
    }

    @Bean
    public GroupedOpenApi feedbackApi() {
        return GroupedOpenApi.builder()
                .group("feedback-api")
                .pathsToMatch("/feedback/**")
                .build();
    }

    @Bean
    public GroupedOpenApi orderApi() {
        return GroupedOpenApi.builder()
                .group("order-api")
                .pathsToMatch("/order/**")
                .build();
    }

    @Bean
    public GroupedOpenApi productOrderApi() {
        return GroupedOpenApi.builder()
                .group("product-order-api")
                .pathsToMatch("/order/product/**")
                .build();
    }

    @Bean
    public GroupedOpenApi statisApi() {
        return GroupedOpenApi.builder()
                .group("statis-api")
                .pathsToMatch("/statis/**")
                .build();
    }

    @Bean
    public GroupedOpenApi accountApi() {
        return GroupedOpenApi.builder()
                .group("account-api")
                .pathsToMatch("/accounts/**")
                .build();
    }
}

