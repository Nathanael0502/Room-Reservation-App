package org.example.backapp.notes.Repository;

import org.example.backapp.notes.Model.NoteModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<NoteModel, Integer> {
    List<NoteModel> findByChambre_Id(Long id);
}
