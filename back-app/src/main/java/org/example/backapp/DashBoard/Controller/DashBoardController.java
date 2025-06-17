package org.example.backapp.DashBoard.Controller;

import org.example.backapp.DashBoard.Service.DashBoardService;
import org.example.backapp.Reservation.Model.ReservationModel;
import org.example.backapp.paiement.service.PaiementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashBoard")
public class DashBoardController {
    @Autowired
    private DashBoardService dashBoardService;
    @Autowired
    private PaiementService paiementService;
    @GetMapping("revenus")
    public Double Revenus(){
        return dashBoardService.getTotalPaiement();
    }
    @GetMapping("users")
    public Long Users(){
        return dashBoardService.getCountUsers();
    }
    @GetMapping("rooms")
    public Long Rooms(){
        return dashBoardService.getCountRooms();
    }
    @GetMapping("countR")
    public Long countR(){
        return dashBoardService.getCountReservation();
    }
    @GetMapping("countRT")
    public Long countRT(){
        return dashBoardService.ReservationToday();
    }
    @GetMapping("listR")
    public List<ReservationModel> listR(){
        return dashBoardService.ReservationTodayList();
    }
    @GetMapping("/revenuByDay")
    public List<Map<String,Object>> revenuByDay(){
        return paiementService.getPaiementListByDay();
    }
    
}
