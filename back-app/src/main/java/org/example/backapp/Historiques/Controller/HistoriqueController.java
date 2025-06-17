package org.example.backapp.Historiques.Controller;

import org.example.backapp.Historiques.Model.Historiques;
import org.example.backapp.Historiques.Repository.HistoriqueRepository;
import org.example.backapp.Historiques.Service.historiqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historiques")
public class HistoriqueController {
    @Autowired
    private historiqueService service;
    @Autowired
    private HistoriqueRepository historiqueRepository;

    @DeleteMapping("/{id}")
    public List<Historiques> deleteHistorique(@PathVariable Long id) {
        return historiqueRepository.findAll();
    }
    @GetMapping("/{id}")
    public List<Historiques> GetAllHistoriquesByClient(@PathVariable Long id) {
        return service.findByClient(id);
    }
}
