package org.example.backapp.Client.repository;

import org.example.backapp.Client.model.ClientModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface clientRepository extends JpaRepository<ClientModel, Long> {
    Optional<ClientModel> findByEmail(String email);
    @Query("select coalesce(count(c.id),0 ) from ClientModel c")
    Long getCount();

    List<ClientModel> findByRole(String role);
}
