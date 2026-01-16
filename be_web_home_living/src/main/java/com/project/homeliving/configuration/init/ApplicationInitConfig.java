package com.project.homeliving.configuration.init;

import com.project.homeliving.entity.product.Category;
import com.project.homeliving.entity.product.Product;
import com.project.homeliving.entity.user.Account;
import com.project.homeliving.entity.user.User;
import com.project.homeliving.entity.user.Role;
import com.project.homeliving.enums.CategoryTypeEnum;
import com.project.homeliving.enums.RoleEnum;
import com.project.homeliving.repository.feedback.IFeedbackRepository;
import com.project.homeliving.repository.order.IOrderDetailRepository;
import com.project.homeliving.repository.order.IOrderRepository;
import com.project.homeliving.repository.product.ICategoryRepository;
import com.project.homeliving.repository.product.IProductRepository;
import com.project.homeliving.repository.user.IAccountRepository;
import com.project.homeliving.repository.user.IUserRepository;
import com.project.homeliving.service.interfaces.user.IRoleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class ApplicationInitConfig {

    private final IRoleService roleService;
    private final IAccountRepository accountRepository;
    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ICategoryRepository categoryRepository;
    private final IProductRepository productRepository;
    private final IOrderRepository orderRepository;
    private final IOrderDetailRepository orderDetailRepository;
    private final IFeedbackRepository feedbackRepository;


    @Bean
    ApplicationRunner applicationRunner(){
        return args ->{
            this.createRoles();
            this.createUser();
            this.createCategories();
            this.createProducts();
            this.createCustomers();
        };
    }

    void createRoles(){
        List<String> roleList = RoleEnum.roleList();
        for(String roleName: roleList){
            if(roleService.exitsByName(roleName) == false){
                roleService.create(roleName);
            }
        }
    }

    void createUser(){
        if (userRepository.count() != 0)
            return;

        User userAdmin = new User();
        User userCustomer = new User();

        Account accountAdmin = Account.builder()
                .username("admin@gmail.com")
                .password(passwordEncoder.encode("1234"))
                .role(new Role(RoleEnum.ADMIN.name()))
                .build();

        Account accountCustomer = Account.builder()
                .username("user@gmail.com")
                .password(passwordEncoder.encode("1234"))
                .role(new Role(RoleEnum.CUSTOMER.name()))
                .build();

        userAdmin.setAccount(accountAdmin);
        userCustomer.setAccount(accountCustomer);

        accountRepository.save(accountAdmin);
        accountRepository.save(accountCustomer);

        userRepository.save(userAdmin);
        userRepository.save(userCustomer);
    }

    void createCategories(){
        List<String> treatmentCategories = List.of(
                "Tóc",
                "Làm đẹp",
                "Nail"
        );

        for(String categoryName : treatmentCategories){
            if(!categoryRepository.existsByNameAndCategoryType(categoryName, CategoryTypeEnum.COMMISSION.name())){
                Category category = Category.builder()
                        .name(categoryName)
                        .categoryType(CategoryTypeEnum.COMMISSION.name())
                        .build();
                categoryRepository.save(category);
            }
        }

        List<String> productCategories = List.of(
                "Chăm sóc tóc",
                "Nail",
                "Mỹ phẩm"
        );

        for(String categoryName : productCategories){
            if(!categoryRepository.existsByNameAndCategoryType(categoryName, CategoryTypeEnum.PRODUCT.name())){
                Category category = Category.builder()
                        .name(categoryName)
                        .categoryType(CategoryTypeEnum.PRODUCT.name())
                        .build();
                categoryRepository.save(category);
            }
        }
    }

    void createProducts(){
        if(productRepository.count() > 0) {
            return;
        }

        Category chamSocTocCategory = categoryRepository.findAll().stream()
                .filter(cat -> "Chăm sóc tóc".equals(cat.getName()) && CategoryTypeEnum.PRODUCT.name().equals(cat.getCategoryType()))
                .findFirst().orElse(null);

        Category myPhamCategory = categoryRepository.findAll().stream()
                .filter(cat -> "Mỹ phẩm".equals(cat.getName()) && CategoryTypeEnum.PRODUCT.name().equals(cat.getCategoryType()))
                .findFirst().orElse(null);

        Category nailCategory = categoryRepository.findAll().stream()
                .filter(cat -> "Nail".equals(cat.getName()) && CategoryTypeEnum.PRODUCT.name().equals(cat.getCategoryType()))
                .findFirst().orElse(null);

        List<Product> products = List.of(
                Product.builder()
                        .name("Dầu gội Loreal Professional")
                        .image("https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500")
                        .price(350000.0)
                        .quantity(50L)
                        .supplier("Loreal Vietnam")
                        .category(chamSocTocCategory)
                        .build(),

                Product.builder()
                        .name("Serum dưỡng tóc Kerastase")
                        .image("https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500")
                        .price(850000.0)
                        .quantity(30L)
                        .supplier("Kerastase Official")
                        .category(chamSocTocCategory)
                        .build(),

                Product.builder()
                        .name("Kem ủ tóc Schwarzkopf")
                        .image("https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500")
                        .price(450000.0)
                        .quantity(40L)
                        .supplier("Schwarzkopf Professional")
                        .category(chamSocTocCategory)
                        .build(),

                Product.builder()
                        .name("Sơn gel OPI")
                        .image("https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500")
                        .price(280000.0)
                        .quantity(100L)
                        .supplier("OPI Vietnam")
                        .category(nailCategory)
                        .build(),

                Product.builder()
                        .name("Kem dưỡng da Olay")
                        .image("https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500")
                        .price(320000.0)
                        .quantity(60L)
                        .supplier("P&G Vietnam")
                        .category(myPhamCategory)
                        .build(),

                Product.builder()
                        .name("Wax tạo kiểu tóc Gatsby")
                        .image("https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500")
                        .price(120000.0)
                        .quantity(80L)
                        .supplier("Mandom Vietnam")
                        .category(chamSocTocCategory)
                        .build(),

                Product.builder()
                        .name("Mặt nạ dưỡng da SK-II")
                        .image("https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500")
                        .price(1200000.0)
                        .quantity(20L)
                        .supplier("SK-II Official")
                        .category(myPhamCategory)
                        .build(),

                Product.builder()
                        .name("Dầu dưỡng móng CND")
                        .image("https://images.unsplash.com/photo-1599948128020-9a44d19b5e3e?w=500")
                        .price(180000.0)
                        .quantity(70L)
                        .supplier("CND Vietnam")
                        .category(nailCategory)
                        .build()
        );

        productRepository.saveAll(products);
        log.info("Đã tạo {} products mẫu", products.size());
    }

    void createCustomers(){
        if(userRepository.count() > 0) {
            return;
        }

        Role customerRole = new Role(RoleEnum.CUSTOMER.name());

        List<User> users = List.of(
                User.builder()
                        .fullName("Nguyễn Văn An")
                        .phoneNumber("0987654321")
                        .email("an.nguyen@gmail.com")
                        .note("Khách hàng VIP")
                        .avatar("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500")
                        .account(Account.builder()
                                .username("customer_an")
                                .password(passwordEncoder.encode("123456"))
                                .role(customerRole)
                                .build())
                        .build(),

                User.builder()
                        .fullName("Trần Thị Bình")
                        .phoneNumber("0987654322")
                        .email("binh.tran@gmail.com")
                        .note("Thích dịch vụ nail")
                        .avatar("https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500")
                        .account(Account.builder()
                                .username("customer_binh")
                                .password(passwordEncoder.encode("123456"))
                                .role(customerRole)
                                .build())
                        .build(),

                User.builder()
                        .fullName("Lê Văn Cường")
                        .phoneNumber("0987654323")
                        .email("cuong.le@gmail.com")
                        .note("Cắt tóc định kỳ")
                        .avatar("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500")
                        .account(Account.builder()
                                .username("customer_cuong")
                                .password(passwordEncoder.encode("123456"))
                                .role(customerRole)
                                .build())
                        .build(),

                User.builder()
                        .fullName("Phạm Thị Dung")
                        .phoneNumber("0987654324")
                        .email("dung.pham@gmail.com")
                        .note("Thích chăm sóc da")
                        .avatar("https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500")
                        .account(Account.builder()
                                .username("customer_dung")
                                .password(passwordEncoder.encode("123456"))
                                .role(customerRole)
                                .build())
                        .build(),

                User.builder()
                        .fullName("Hoàng Văn Em")
                        .phoneNumber("0987654325")
                        .email("em.hoang@gmail.com")
                        .note("Khách hàng mới")
                        .avatar("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500")
                        .account(Account.builder()
                                .username("customer_em")
                                .password(passwordEncoder.encode("123456"))
                                .role(customerRole)
                                .build())
                        .build()
        );

        // Lưu account trước, sau đó lưu user
        for(User user : users) {
            accountRepository.save(user.getAccount());
            userRepository.save(user);
        }

        log.info("Đã tạo {} users mẫu", users.size());
    }

}
