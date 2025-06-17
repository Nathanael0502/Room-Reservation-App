package org.example.backapp.Stars.Controller;

import org.example.backapp.Stars.Model.StarsModel;
import org.example.backapp.Stars.Repository.StarsRepository;
import org.example.backapp.Stars.Service.StarsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stars")
public class StarsController {
    @Autowired
    private StarsService starsService;
    @Autowired
    StarsRepository starsRepository;
    @PostMapping("add")
    public StarsModel addOrUpdateSart(@RequestParam int stars, @RequestParam Long clientId,@RequestParam Long chambreId) {
        return starsService.addOrUpdateStars(stars, clientId, chambreId);
    }
    @GetMapping("get/{id}")
    public List<StarsModel> getStars(@PathVariable Long id) {
        return starsService.getClientById(id);
    }
    @GetMapping("all")
    public List<StarsModel> getAllStars() {
        return starsRepository.findAll();
    }
}
