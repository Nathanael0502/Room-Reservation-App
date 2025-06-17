package org.example.backapp.notifications.Repository;

import org.example.backapp.notifications.Models.NotificatonModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<NotificatonModel, Integer> {
    List<NotificatonModel> findByClientId(Long clientId);
}
