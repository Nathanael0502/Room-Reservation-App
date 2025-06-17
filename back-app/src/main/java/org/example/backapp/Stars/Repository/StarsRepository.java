package org.example.backapp.Stars.Repository;

import org.example.backapp.Client.model.ClientModel;
import org.example.backapp.Stars.Model.StarsModel;
import org.example.backapp.chambre.model.Chambre;
import org.example.backapp.paiement.model.PaiementModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StarsRepository extends JpaRepository<StarsModel,Long> {
    Optional<StarsModel> findByClientAndChambre(ClientModel client, Chambre chambre);
    List<StarsModel> findByClientId(Long id);
    List<StarsModel> findByChambreId(Long id);
    @Query("select s.client from StarsModel s where s.stars=5")
    List<ClientModel> findBestClients();
    @Query("select s.chambre from StarsModel s where s.stars=5")
    List<Chambre> findBestChambres();
    @Query("SELECT c FROM ClientModel c WHERE c.id = (" +
            "SELECT rm.client.id FROM ReservationModel rm " +
            "GROUP BY rm.client.id " +
            "ORDER BY COUNT(rm.id) DESC limit 1)")
    Optional<ClientModel> findTopClients();
    @Query("SELECT c FROM ClientModel c WHERE c.id = (" +
            "SELECT rm.reservation.client.id FROM PaiementModel rm " +
            "GROUP BY rm.reservation.client.id " +
            "ORDER BY COUNT(rm.price) DESC limit 1)")
    Optional<ClientModel> findTopPaiements();
    @Query("select c from Chambre c group by c.type")
    List<Chambre> GroupTypeChambres();


}
