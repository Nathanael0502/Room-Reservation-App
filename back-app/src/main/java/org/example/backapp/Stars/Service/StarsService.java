package org.example.backapp.Stars.Service;

import org.example.backapp.Client.model.ClientModel;
import org.example.backapp.Stars.Model.StarsModel;
import org.example.backapp.Stars.Repository.StarsRepository;
import org.example.backapp.chambre.model.Chambre;
import org.example.backapp.chambre.repository.ChambreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import  org.example.backapp.Client.repository.clientRepository;

import java.util.List;
import java.util.Optional;

@Service
public class StarsService {
    @Autowired
    private StarsRepository starsRepository;
    @Autowired
    private clientRepository clientRepository;
    @Autowired
    private ChambreRepository chambreRepository;

    public StarsModel addOrUpdateStars(int stars,Long clienId,Long chambreId){
        ClientModel clientModel=clientRepository.findById(clienId).orElseThrow();
        Chambre chambre=chambreRepository.findById(chambreId).orElseThrow();
        Optional<StarsModel> existeS=starsRepository.findByClientAndChambre(clientModel,chambre);
        List<StarsModel> clientModels=starsRepository.findByClientId(clienId);
        List<StarsModel> chambreS=starsRepository.findByChambreId(chambreId);




        if(existeS.isPresent()){
            StarsModel starsModel=existeS.get();
            starsModel.setStars(stars);
            return starsRepository.save(starsModel);
        }else {

            StarsModel starsModel = new StarsModel();

            starsModel.setStars(stars);
            starsModel.setClient(clientModel);
            starsModel.setChambre(chambre);
            return starsRepository.save(starsModel);
        }
    }

    public List<StarsModel> getClientById(Long clienId){
        return starsRepository.findByClientId(clienId);
    }
}
