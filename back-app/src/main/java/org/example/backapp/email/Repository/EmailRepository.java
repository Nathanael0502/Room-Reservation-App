package org.example.backapp.email.Repository;

import org.example.backapp.email.Model.EmailModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmailRepository extends JpaRepository<EmailModel,Long> {
    List<EmailModel> findByParentMessageId(Long parentMessageId);
}
