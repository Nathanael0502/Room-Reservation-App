package org.example.backapp.chambre.Controller;

import org.example.backapp.chambre.repository.ChambreRepository;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.example.backapp.chambre.model.Chambre;
import org.example.backapp.chambre.service.ChambreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/chambres")
public class ChambreController {
    @Autowired
    private ChambreService chambreService;
    @Autowired
    private ChambreRepository chambreRepository;

    @GetMapping("/disponibles")
    public List<Chambre> GetChambredisponibles() {
        return chambreService.getChambreDispo();
    }
    @GetMapping("/image/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) throws MalformedURLException {
        Path imagePath= Paths.get("uploadChambre/").resolve(imageName);
       Resource resource=  new UrlResource(imagePath.toUri());

       return ResponseEntity.ok()
               .contentType(MediaType.IMAGE_JPEG)
               .body(resource);

    }
  @GetMapping("/{id}")
  public Optional<Chambre> GetChambreByID(@PathVariable Long id) {
    return  chambreService.getChambreById(id);
  }
  @GetMapping("/dispo/{id}/{idU}")
  public Chambre rendreDispo(@PathVariable Long id,@PathVariable Long idU) {
        chambreService.setChambreDispo(id,idU);
        Chambre chambre=chambreRepository.findById(id).orElseThrow();
        return chambre;
  }
    @PostMapping("/ajouter")
    public Chambre AddChambre(@RequestParam String numero,
                              @RequestParam String type,
                              @RequestParam double prix,
                              @RequestParam MultipartFile file,
                              @RequestParam Long id
                              ) throws Exception {

            return chambreService.addChambre(numero,type,prix,file,id);

    }

    @DeleteMapping("/{id}/{idU}")
    public List<Chambre> DeletChambre(@PathVariable Long id,@PathVariable Long idU) {
           chambreService.deleteChambre(id,idU);
           return chambreRepository.findAll();

    }

    @PutMapping("/{id}")
  public Optional<Chambre> findChambre(
            @PathVariable Long id

    ){
        return chambreService.getChambreById(id);

   }
   @PutMapping("/update/{id}")
    public Chambre updateChambre(
            @PathVariable Long id,
            @RequestParam String numero,
            @RequestParam String type,
            @RequestParam Double prix,@RequestParam Long idU,

            @RequestParam MultipartFile image) throws IOException {
        chambreService.updateChambre(id,numero,type,prix,image,idU);
        return chambreRepository.findById(id).orElseThrow();
   }
   @PutMapping("/mis/{id}")
    public Chambre updateChambreSans(
           @PathVariable Long id,
           @RequestParam String numero,
           @RequestParam String type,
           @RequestParam Double prix,
    @RequestParam Long idU
           ){
        chambreService.misChambre(id, numero, type, prix,idU);
        return chambreRepository.findById(id).orElseThrow();
   }
  @GetMapping("/indisponible")
    public List<Chambre> GetChambreIndisponible() {
        return chambreRepository.findByDisponibleFalse();
  }
}
