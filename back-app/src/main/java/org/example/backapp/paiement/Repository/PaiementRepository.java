package org.example.backapp.paiement.Repository;

import org.example.backapp.paiement.model.PaiementModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface PaiementRepository extends JpaRepository<PaiementModel,Long> {
    Optional<PaiementModel> findReservationById(Long reservation_id);
     PaiementModel findByReservationId(Long reservation_id);
    @Query("select p.DatePaiement as datep, sum(p.price) as total from PaiementModel p group by p.DatePaiement order by p.DatePaiement")
    List<Map<String, Object>> findPaiementByDay();
    @Query("select p.DatePaiement as datep, sum(p.price) as total from PaiementModel p where p.reservation.client.id=:idCli group by p.DatePaiement order by p.DatePaiement")
    List<Map<String, Object>> findPaiementByCli(@Param("idCli") Long idCli);
}
