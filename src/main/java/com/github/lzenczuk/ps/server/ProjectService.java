package com.github.lzenczuk.ps.server;

import com.github.lzenczuk.ps.server.dto.ProjectDTO;

import java.util.LinkedList;
import java.util.List;

/**
 * @author lzenczuk 09/10/2015
 */
public class ProjectService {

    private List<ProjectDTO> projects = new LinkedList<>();

    public ProjectService() {
        projects.add(new ProjectDTO("Test 1", "This is project one"));
        projects.add(new ProjectDTO("Test 2", "This is project two"));
        projects.add(new ProjectDTO("Test 3", "This is project three"));
        projects.add(new ProjectDTO("Test 4", "This is project four"));
        projects.add(new ProjectDTO("Test 5", "This is project five"));
    }

    public List<ProjectDTO> getAllProjects(){
        return projects;
    }
}
