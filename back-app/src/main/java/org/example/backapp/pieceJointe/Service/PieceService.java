package org.example.backapp.pieceJointe.Service;

import org.example.backapp.Client.model.ClientModel;
import org.example.backapp.Client.repository.clientRepository;
import org.example.backapp.pieceJointe.Model.FileEntity;
import org.example.backapp.pieceJointe.Repository.PieceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;

@Service
public class PieceService {
    @Autowired
    private clientRepository clientR;
    @Autowired
    private PieceRepository pieceRepository;
    private final String uploadDir="uploadFile/";

    public FileEntity saveFile(MultipartFile file,Long idCli) throws IOException {
        File directory=new File(uploadDir);
        if(!directory.exists()) {
            directory.mkdirs();
        }
        String fileName=System.currentTimeMillis()+"_"+file.getOriginalFilename();
        Path filePath= Paths.get(uploadDir,fileName);

        Files.copy(file.getInputStream(),filePath, StandardCopyOption.REPLACE_EXISTING);
        ClientModel clientModel=clientR.findById(idCli).orElseThrow();
        FileEntity fileEntity = new FileEntity();
        fileEntity.setFileName(file.getOriginalFilename());
        fileEntity.setFileType(file.getContentType());
        fileEntity.setFilePath(filePath.toString());
        fileEntity.setClient(clientModel);

        return pieceRepository.save(fileEntity);

    }
    public File getFile(Long id){
        return pieceRepository.findById(id)
                .map(fileEntity->new File(fileEntity.getFilePath()))
                .orElse(null);
    }
  public List<FileEntity> getAllInfo(){
        return pieceRepository.findAll();
  }
  public ResponseEntity<Map<String,String>> deleteFile(Long id){
        pieceRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "File deleted successfully"));
  }
}
