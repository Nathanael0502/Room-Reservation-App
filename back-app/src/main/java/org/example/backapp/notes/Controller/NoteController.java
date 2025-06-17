package org.example.backapp.notes.Controller;

import org.example.backapp.notes.Model.NoteModel;
import org.example.backapp.notes.Services.NOtesServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/notes")
public class NoteController {
    @Autowired
    private NOtesServices notesServices;

    @GetMapping("show")
    public List<NoteModel> getNotes() {
        return  notesServices.getAllNotes();
    }
    @PostMapping("create")
    public NoteModel createNote(@RequestParam String notes,
                                @RequestParam Long idChambre,@RequestParam Long idClient){
        return notesServices.createNote(notes,idChambre,idClient);
    }
    @DeleteMapping("delete/{id}")
    public List<NoteModel> deleteNote(@PathVariable int id){
        notesServices.deleteNote(id);
        return  notesServices.getAllNotes();
    }
    @PutMapping("updateSt/{id}")
    public  NoteModel updateSt(@PathVariable int id){
       return notesServices.updateStars(id);
    }
    @DeleteMapping("{id}")
    public NoteModel deleteN(@PathVariable int id){
        return notesServices.deleteNotes(id);
    }

}
