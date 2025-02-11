package com.blift.backend.controllers;
import com.blift.backend.entities.Consultant;
import com.blift.backend.entities.User;
import com.blift.backend.services.HireRCICService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/HireRCIC")
@RestController

public class HireRCICController {

    private final HireRCICService rcicService;

    @Autowired
    public HireRCICController(HireRCICService rcicService){
        this.rcicService = rcicService;
    }

    @PutMapping("/preferences")
    public void putPreference (@RequestBody User user){
        rcicService.updatePreference(user);
    }

    @GetMapping
    public List<Consultant> getRCICAgents(String language, String location){
        return rcicService.getAgents(language, location);
    }


}
