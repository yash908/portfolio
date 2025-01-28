package com.portfolio;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Map;

@Controller
public class PortfolioController {

    private final GitHubService gitHubService;

    public PortfolioController(GitHubService gitHubService) {
        this.gitHubService = gitHubService;
    }

    @GetMapping("/")
    public String home(Model model) {
        String username = "yash908";
        
        Map<String, Object> profile = gitHubService.getUserProfile(username);
        List<Map<String, Object>> repositories = gitHubService.getUserRepositories(username);

        model.addAttribute("profile", profile);
        model.addAttribute("repositories", repositories);

        return "portfolio";
    }
}
