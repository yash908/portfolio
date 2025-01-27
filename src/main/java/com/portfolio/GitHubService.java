import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class GitHubService {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String GITHUB_API_URL = "https://api.github.com/users/{yash908}/repos";

    public List<Map<String, Object>> getRepositories(String username) {
        return restTemplate.getForObject(GITHUB_API_URL, List.class, username);
    }
}
