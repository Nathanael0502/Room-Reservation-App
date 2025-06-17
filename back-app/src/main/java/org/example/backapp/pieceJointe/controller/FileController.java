package org.example.backapp.pieceJointe.controller;

import org.springframework.core.io.Resource;
import org.example.backapp.pieceJointe.Model.FileEntity;
import org.example.backapp.pieceJointe.Service.PieceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
public class FileController {
    @Autowired
    private PieceService pieceService;

    @PostMapping("/upload")
    public ResponseEntity<Map<String,String>> uploadFile(@RequestParam("file") MultipartFile file,
                                                         @RequestParam Long idCli) {
        try {
            FileEntity saveFile=pieceService.saveFile(file,idCli);
            return ResponseEntity.ok(Map.of("message","fichier enregistrer"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
@GetMapping()
public List<FileEntity> getAllFiles() {
        return  pieceService.getAllInfo();
}
    @GetMapping("/{id}")
    public ResponseEntity<Resource> getFile(@PathVariable("id") Long id) {
        File file=pieceService.getFile(id);
        if(file==null || !file.exists()) {
            return ResponseEntity.notFound().build();
        }
        Path path= Paths.get(file.getAbsolutePath());
        try {
            Resource resource=  new UrlResource(path.toUri());
            return  ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename="+file.getName())
                    .body(resource);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String,String>> deleteFile(@PathVariable("id") Long id) {
      return   pieceService.deleteFile(id);
    }
}
