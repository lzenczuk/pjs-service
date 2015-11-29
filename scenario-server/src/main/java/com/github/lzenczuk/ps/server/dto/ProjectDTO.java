package com.github.lzenczuk.ps.server.dto;

/**
 * @author lzenczuk 09/10/2015
 */
public class ProjectDTO {
    private String name;
    private String description;

    public ProjectDTO() {
    }

    public ProjectDTO(String name, String description) {
        this.description = description;
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "ProjectDTO{" +
                "description='" + description + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
