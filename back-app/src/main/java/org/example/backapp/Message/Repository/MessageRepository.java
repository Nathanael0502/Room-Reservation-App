package org.example.backapp.Message.Repository;

import org.example.backapp.Client.model.ClientModel;
import org.example.backapp.Message.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySender(ClientModel sender);
    List<Message> findByReceiver(ClientModel receiver);
    List<Message> findBySenderAndReceiver(ClientModel sender, ClientModel receiver);
    @Query("select m from Message m where m.receiver.id=:receiverId and m.sender.id=:senderId or m.receiver.id=:senderId and m.sender.id=:receiverId")
    List<Message>SearchChat(@Param("senderId") Long senderId,@Param("receiverId")  Long receiverId);

}
