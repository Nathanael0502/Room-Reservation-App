package org.example.backapp.pieceJointe.Repository;

import org.example.backapp.pieceJointe.Model.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PieceRepository extends JpaRepository<FileEntity,Long> {
}
