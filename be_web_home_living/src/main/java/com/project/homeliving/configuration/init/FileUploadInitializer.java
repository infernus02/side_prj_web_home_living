package com.project.homeliving.configuration.init;

import com.project.homeliving.util.FileUtils;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@Component
public class FileUploadInitializer {

    @PostConstruct
    public void init() {
        Path dirPath = Paths.get(FileUtils.FOLDER_UPDATE_MEDIA);

        if (!Files.exists(dirPath)) {
            try {
                Files.createDirectories(dirPath);
                log.info("Tạo thư mục upload thành công: {}", dirPath.toAbsolutePath());
            } catch (IOException e) {
                log.error("Không thể tạo thư mục uploads: {}, lỗi: {}", dirPath, e.getMessage());
                throw new RuntimeException("Không thể tạo thư mục uploads: " + dirPath, e);
            }
        }
    }
}
