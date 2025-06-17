package org.example.backapp.notes.Services;

import org.example.backapp.Client.model.ClientModel;
import org.example.backapp.Client.repository.clientRepository;
import org.example.backapp.Historiques.Service.historiqueService;
import org.example.backapp.chambre.model.Chambre;
import org.example.backapp.chambre.repository.ChambreRepository;
import org.example.backapp.notes.Model.NoteModel;
import org.example.backapp.notes.Repository.NoteRepository;
import org.example.backapp.notifications.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NOtesServices {
    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private clientRepository CliRepos;
    @Autowired
    private ChambreRepository chambreRepository;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private historiqueService hist;

    public List<NoteModel> getAllNotes() {
        return noteRepository.findAll();
    }
    public ResponseEntity<String> deleteNote(int id) {
        noteRepository.deleteById(id);
        return ResponseEntity.ok("Note deleted");
    }
    public NoteModel createNote(String notes,Long chambreID,Long CleintId) {
        Chambre chambre = chambreRepository.findById(chambreID).orElseThrow();
        ClientModel client=CliRepos.findById(CleintId).orElseThrow();
        String message=client.getNom()+" "+client.getPrenom()+",une personne que vous connaissez peut-être vient de commenter une chambre";
        notificationService.createNotification(CleintId,message);
        NoteModel noteModel=new NoteModel();
         noteModel.setNbStars(0);
        noteModel.setNotes(notes);
        noteModel.setChambre(chambre);
        noteModel.setClient(client);
        hist.AjoutHistorique("Ajouts de notes",CleintId);
        return noteRepository.save(noteModel);
    }
    public NoteModel updateStars(int id) {
        NoteModel noteModel=noteRepository.findById(id).orElseThrow();
        noteModel.setNbStars(0);
        return noteRepository.save(noteModel);
    }
    public NoteModel deleteNotes(int id) {
        NoteModel noteModel=noteRepository.findById(id).orElseThrow();

        hist.AjoutHistorique("Suppression de notes",noteModel.getClient().getId());
        noteModel.setNotes("");
        return noteRepository.save(noteModel);
    }
}
