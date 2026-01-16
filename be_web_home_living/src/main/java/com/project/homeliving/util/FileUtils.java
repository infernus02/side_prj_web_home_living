package com.project.homeliving.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

public class FileUtils {
    public static final String FOLDER_UPDATE_MEDIA =
            Paths.get(System.getProperty("user.dir")).getParent().resolve("uploads").toString();

    public static String saveFileWithCustomDir(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File empty");
        }

        String originalFilename = file.getOriginalFilename();
        String fileExtension = "";

        if (originalFilename != null && originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        String newFileName = UUID.randomUUID() + "_" + originalFilename + fileExtension;

        Path dirPath = Paths.get(FOLDER_UPDATE_MEDIA);

        Path filePath = dirPath.resolve(newFileName);
        try {
            Files.write(filePath, file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return "http://localhost:8085" + "/uploads/" + newFileName;
    }
}
