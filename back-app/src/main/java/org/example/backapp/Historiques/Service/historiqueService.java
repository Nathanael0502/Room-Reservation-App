package org.example.backapp.Historiques.Service;

import org.example.backapp.Client.model.ClientModel;
import org.example.backapp.Client.repository.clientRepository;
import org.example.backapp.Historiques.Model.Historiques;
import org.example.backapp.Historiques.Repository.HistoriqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class historiqueService {
    @Autowired
    private HistoriqueRepository historiqueRepository;
    @Autowired
    private clientRepository cliRp;
    public Historiques AjoutHistorique(String historique,Long id) {
        ClientModel client=cliRp.findById(id).orElseThrow();
        Historiques historiques = new Historiques();
        historiques.setHistorique(historique);
        historiques.setClient(client);
        return historiqueRepository.save(historiques);
    }
    public ResponseEntity<String> DeleteHistorique(Long id) {
      historiqueRepository.deleteById(id);
      return ResponseEntity.ok("Historique supprimer");
    }
    public List<Historiques> findByClient(Long id) {
        return historiqueRepository.findByClientId(id);
    }
}

