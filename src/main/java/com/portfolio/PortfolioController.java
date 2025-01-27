import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Map;

@Controller
public class PortfolioController {

    @Autowired
    private GitHubService gitHubService;

    @GetMapping("/")
    public String portfolio(Model model) {
        String username = "yash908"; 
        List<Map<String, Object>> repositories = gitHubService.getRepositories(username);

        repositories.removeIf(repo -> !"Java".equals(repo.get("language")));

        model.addAttribute("profile", Map.of(
            "name", "Yash Sarda",
            "bio", "Full-Stack Developer skilled in Java Spring, MongoDB, SQL, and AI",
            "avatar_url", "https://avatars.githubusercontent.com/u/908" 
        ));
        model.addAttribute("repositories", repositories);
        return "portfolio";
    }
}
