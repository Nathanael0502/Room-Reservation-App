package org.example.backapp.DashBoard.Repository;

import org.example.backapp.paiement.model.PaiementModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface dashBoardRepository extends JpaRepository<PaiementModel,Long> {
    @Query("SELECT COALESCE(SUM(p.price),0) from PaiementModel p")
    Double getTotalPrice();
}
