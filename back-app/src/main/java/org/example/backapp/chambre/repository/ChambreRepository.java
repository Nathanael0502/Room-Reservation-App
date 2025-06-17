package org.example.backapp.chambre.repository;

import org.example.backapp.chambre.model.Chambre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface ChambreRepository extends JpaRepository<Chambre, Long> {
    List<Chambre> findByDisponibleTrue();
    List<Chambre>findByDisponibleFalse();
 @Query("select coalesce(count(c.id),0) from Chambre c")
    Long countChambre();
}
