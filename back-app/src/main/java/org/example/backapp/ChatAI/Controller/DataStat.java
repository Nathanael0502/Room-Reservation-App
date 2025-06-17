package org.example.backapp.ChatAI.Controller;

import org.example.backapp.ChatAI.Service.DataScience;
import org.example.backapp.Client.model.ClientModel;
import org.example.backapp.Reservation.repository.reservationRepository;
import org.example.backapp.Stars.Repository.StarsRepository;
import org.example.backapp.chambre.model.Chambre;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/dataStat")
public class DataStat  {
    @Autowired
    private DataScience dataScience;
    @Autowired
    private StarsRepository starsRepository;
    @Autowired
    private reservationRepository reservP;

    @GetMapping("/totalReserve/{id}")
    public Long totalReserve(@PathVariable Long id){
        return dataScience.totalReservationByCli(id);
    }
    @GetMapping("/totalPCli/{id}")
    public Long totalPCli(@PathVariable Long id){
        return dataScience.totalPaiementByCli(id);
    }
    @GetMapping("/lisPayCli/{id}")
    public List<Map<String,Object>> lisPayCli(@PathVariable Long id){
        return  dataScience.listPaiementByCli(id);
    }
    @GetMapping("/listReservByCli/{id}")
    public List<Map<String,Object>> listReservByCli(@PathVariable Long id){
        return dataScience.listReservationByCli(id);
    }
    @GetMapping("/topCli")
    public List<ClientModel> TopCLient(){
        return starsRepository.findBestClients();
    }
    @GetMapping("/topChambre")
    public List<Chambre> TopChambre(){
        return starsRepository.findBestChambres();
    }
    @GetMapping("/bestCli")
    public Optional<ClientModel> BestCli(){
        return starsRepository.findTopClients();
    }
    @GetMapping("/bestPay")
    public Optional<ClientModel> BestPay(){
    return starsRepository.findTopPaiements();
    }
    @GetMapping("/typeChambre")
    public List<Chambre> TypeChambre(){
        return starsRepository.GroupTypeChambres();
    }
    @GetMapping("/ReservStat")
    public List<Map<String,Object>> ReservStat(){
        return reservP.findPaiementByReserv();
    }

}
