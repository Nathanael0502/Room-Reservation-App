package org.example.backapp.Reservation.repository;

import org.example.backapp.Reservation.Model.ReservationModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public interface reservationRepository extends JpaRepository<ReservationModel,Long> {
    List<ReservationModel> findByClientId(Long clientId);
    List<ReservationModel> findByConfirmation(Boolean confirmed);
    ReservationModel findByChambreId(Long chambreId);
    @Query("select r from ReservationModel  r where r.dateFin>=:today ")
    List<ReservationModel> getreservationTommorow(@Param("today") LocalDate today);
    @Modifying
    @Transactional
    @Query("update Chambre c set c.disponible=true where c.id in "+
            "(select r.chambre.id from ReservationModel r where r.dateFin<:today)")
    void libereChambre(@Param("today") LocalDate today);

    @Query("select coalesce(count(r.id),0) from ReservationModel r")
   Long getTotalReservations();

    @Query("select coalesce( count(r.id),0) from ReservationModel r where r.dateDebut=:today ")
 Long getTotalReservationsToday(@Param("today") LocalDate today);

    @Query("select r from ReservationModel r where r.dateDebut=:today ")
    List<ReservationModel> getReservationsToday(@Param("today") LocalDate today);

    @Query("select coalesce(count(r.id),0) from ReservationModel  r where r.client.id=:idCli")
    Long getTotalReservationsCli(@Param("idCli") Long idCli);

    @Query("select coalesce(sum(p.price),0) from PaiementModel  p where p.reservation.client.id=:idCli")
    Long getTotalPaiementsCli(@Param("idCli") Long idCli);

    @Query("select r.dateDebut as  date,count(r) from ReservationModel r where  r.client.id=:idCli group by r.dateDebut order by  r.dateDebut ")
    List<Object[]> getTotalDebutsCli(@Param("idCli") Long idCli);
    @Query("select r.dateDebut as  date,count(r) as total from ReservationModel r group by r.dateDebut order by  r.dateDebut ")
    List<Map<String, Object>> findPaiementByReserv();
}
