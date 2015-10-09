package com.github.lzenczuk.ps.server.dto;

import java.util.Collections;
import java.util.List;

/**
 * @author lzenczuk 09/10/2015
 */
public class ProjectListDTO {
    private List<ProjectDTO> projects = Collections.emptyList();

    public ProjectListDTO() {
    }

    public ProjectListDTO(List<ProjectDTO> projects) {
        this.projects = projects;
    }

    public List<ProjectDTO> getProjects() {
        return projects;
    }

    public void setProjects(List<ProjectDTO> projects) {
        this.projects = projects;
    }
}
