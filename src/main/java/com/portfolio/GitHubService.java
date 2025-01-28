package com.portfolio;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class GitHubService {
    private static final Logger logger = Logger.getLogger(GitHubService.class.getName());
    private static final String GITHUB_API_BASE_URL = "https://api.github.com";

    private final RestTemplate restTemplate;
    private final String githubToken;

    public GitHubService(RestTemplate restTemplate, 
                        @Value("${github.token}") String githubToken) {
        this.restTemplate = restTemplate;
        this.githubToken = githubToken;
    }

    /**
     * Retrieves a user's GitHub profile information
     * @param username GitHub username
     * @return Map containing user profile data
     */
    public Map<String, Object> getUserProfile(String username) {
        try {
            String url = GITHUB_API_BASE_URL + "/users/" + username;
            HttpEntity<String> entity = new HttpEntity<>(createHeaders());
            
            ResponseEntity<Map> response = restTemplate.exchange(
                url, 
                HttpMethod.GET, 
                entity, 
                Map.class
            );
            
            return response.getBody();
        } catch (HttpClientErrorException e) {
            logger.warning("Error fetching GitHub profile for user " + username + ": " + e.getMessage());
            return Map.of("error", "Unable to fetch GitHub profile");
        } catch (Exception e) {
            logger.severe("Unexpected error while fetching GitHub profile: " + e.getMessage());
            return Map.of("error", "An unexpected error occurred");
        }
    }

    /**
     * Retrieves a user's GitHub repositories
     * @param username GitHub username
     * @return List of repositories
     */
    public List<Map<String, Object>> getUserRepositories(String username) {
        try {
            String url = GITHUB_API_BASE_URL + "/users/" + username + "/repos";
            HttpEntity<String> entity = new HttpEntity<>(createHeaders());
            
            ResponseEntity<Map[]> response = restTemplate.exchange(
                url, 
                HttpMethod.GET, 
                entity, 
                Map[].class
            );
            
            return response.getBody() != null ? 
                   Arrays.asList(response.getBody()) : 
                   new ArrayList<>();
        } catch (HttpClientErrorException e) {
            logger.warning("Error fetching repositories for user " + username + ": " + e.getMessage());
            return List.of(Map.of("error", "Unable to fetch repositories"));
        } catch (Exception e) {
            logger.severe("Unexpected error while fetching repositories: " + e.getMessage());
            return List.of(Map.of("error", "An unexpected error occurred"));
        }
    }

    /**
     * Creates HTTP headers with GitHub authentication
     * @return HttpHeaders with authentication
     */
    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + githubToken);
        headers.set("Accept", "application/vnd.github.v3+json");
        return headers;
    }
}
