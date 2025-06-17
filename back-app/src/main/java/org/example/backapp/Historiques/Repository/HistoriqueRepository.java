package org.example.backapp.Historiques.Repository;

import org.example.backapp.Historiques.Model.Historiques;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoriqueRepository extends JpaRepository<Historiques,Long> {
     List<Historiques> findByClientId(Long clientId);
     }
