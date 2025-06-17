package org.example.backapp.paiement.controller;

import org.example.backapp.paiement.model.PaiementModel;
import org.example.backapp.paiement.service.PaiementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/paiements")
public class PaiementController {
    @Autowired
    private PaiementService paiementService;

    @GetMapping("/voirPay")
    public List<PaiementModel> affichePay(){
        return paiementService.paiementList();
    }

    @PostMapping("/payer")
    public PaiementModel payer(@RequestParam Long reservationID,
                                               @RequestParam String modePaiement) {
        PaiementModel paiementModel = paiementService.effectuerPaiement(reservationID, modePaiement);
        return paiementModel;
    }
@DeleteMapping("/supprimer/{id}/{idU}")
public List<PaiementModel> supprimer(@PathVariable Long id,Long idU) {
        return paiementService.paiementList();
}
@PutMapping("/{id}")
    public PaiementModel updatePay(@PathVariable Long id,
                                   @RequestParam String modePaiement,
                                   @RequestParam Long reservationID,
                                   @RequestParam String statut) {
       return paiementService.UpdatePaiement(id,reservationID,modePaiement,statut);
}

}
