package com.project.homeliving.controller;

import com.project.homeliving.util.FileUtils;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/files")
public class FileController {
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String createFile(MultipartFile file) throws IOException {
//        return FileUtils.saveFileToStaticFolder(file);
        return FileUtils.saveFileWithCustomDir(file);
    }
}
