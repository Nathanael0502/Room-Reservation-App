package org.example.backapp.chambre.service;

import org.example.backapp.Historiques.Service.historiqueService;
import org.example.backapp.Reservation.Model.ReservationModel;
import org.example.backapp.Reservation.repository.reservationRepository;
import org.example.backapp.chambre.model.Chambre;
import org.example.backapp.chambre.repository.ChambreRepository;
import org.example.backapp.paiement.Repository.PaiementRepository;
import org.example.backapp.paiement.model.PaiementModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;


@Service
public class ChambreService {
    @Autowired
    private ChambreRepository chambreRepository;
   @Autowired
   private historiqueService histService;
   @Autowired
   private reservationRepository resRepo;
   @Autowired
   private PaiementRepository paiementRepo;

private final String Upload="uploadChambre/";
public Chambre addChambre(String numero, String type, double prix, MultipartFile file,Long id) throws Exception{
    Path uplodaPath= Paths.get(Upload);
    if(!Files.exists(uplodaPath)){
        Files.createDirectory(uplodaPath);
    }

    String filename=System.currentTimeMillis()+'_'+file.getOriginalFilename();
    Path filePath=uplodaPath.resolve(filename);
    Files.copy(file.getInputStream(), filePath);
    histService.AjoutHistorique("Ajout de chambre numero: "+numero, id);
    Chambre chambre=new Chambre();
    chambre.setNumero(numero);
    chambre.setType(type);
    chambre.setDisponible(true);
    chambre.setImagePath(Upload+filename);
    chambre.setPrix(prix);

    return chambreRepository.save(chambre);
}

public List<Chambre> getChambreDispo(){

    return chambreRepository.findByDisponibleTrue();
}
public Chambre deleteChambre(Long id,Long idU){
  Chambre chambre=chambreRepository.findById(id)
          .orElseThrow(()-> new RuntimeException("Chambre non trouvé"));
  chambre.setDisponible(false);
  histService.AjoutHistorique("Suppression de chambre numero:"+chambre.getNumero(),idU);
  return chambreRepository.save(chambre);
}
public  Chambre setChambreDispo(Long id,Long idU){
    Chambre chambre=chambreRepository.findById(id)
            .orElseThrow(()->new RuntimeException("Chambre non trouvé"));
    chambre.setDisponible(true);
    ReservationModel reservationModel= resRepo.findByChambreId(id);

    histService.AjoutHistorique("Chambre numero:"+chambre.getNumero()+" rendu disponible",idU);
    return chambreRepository.save(chambre);
}
public Optional<Chambre> getChambreById(Long id){
    return chambreRepository.findById(id);
}
public Chambre updateChambre(Long id,String numero,
                              String type,
                             Double prix,
                             MultipartFile image,Long idU) throws IOException {
    Chambre chambre=chambreRepository.findById(id)
            .orElseThrow(()->new RuntimeException("Chambre non trouvé"));
    chambre.setNumero(numero);
    chambre.setType(type);
    chambre.setPrix(prix);
    histService.AjoutHistorique("Modification de chambre numero: "+numero, idU);
    if(image!=null && !image.isEmpty()){
        String filename= System.currentTimeMillis()+"_"+image.getOriginalFilename();
        Path filePath=Paths.get(Upload);
        Path upPath=filePath.resolve(filename);
        Files.copy(image.getInputStream(), upPath);
     chambre.setImagePath(Upload+filename);
    }
    return chambreRepository.save(chambre);
}
public Chambre misChambre(Long id,
                          String numero,
                          String type,
                            Double prix,Long idU
){
   Chambre chmbre= chambreRepository.findById(id)
            .orElseThrow(()->new RuntimeException("Chambre non trouvé"));
    chmbre.setNumero(numero);
    chmbre.setType(type);
    chmbre.setPrix(prix);
    histService.AjoutHistorique("Modification de chambre numero: "+numero, idU);
    return chambreRepository.save(chmbre);
}

}
