package org.example.backapp.ChatAI.Service;

import org.example.backapp.Reservation.repository.reservationRepository;
import org.example.backapp.paiement.Repository.PaiementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DataScience {
    @Autowired
    private PaiementRepository paiementRepository;
    @Autowired
    private reservationRepository resRepository;

    public Long totalReservationByCli(Long id){
        return resRepository.getTotalReservationsCli(id);
    }
    public Long totalPaiementByCli(Long id){
     return resRepository.getTotalPaiementsCli(id);
    }
    public List<Map<String,Object>> listPaiementByCli(Long id){
        return paiementRepository.findPaiementByCli(id);
    }
    public List<Map<String,Object>> listReservationByCli(Long id){
       List<Object[]> results=resRepository.getTotalDebutsCli(id);
       List<Map<String,Object>> list=new ArrayList<>();
       for(Object[] result:results){
           Map<String,Object> map=new HashMap<>();
           map.put("dateReservation",result[0]);
           map.put("nbReservations",result[1]);
           list.add(map);
       }
        return list;
    }


}
