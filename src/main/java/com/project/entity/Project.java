package com.project.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.apache.commons.lang.StringUtils;

@Entity
@Table(name = "project")
public class Project extends BaseEntity {
    private String subject;
    @Transient
    private String subjectView;
    private String description;

    private Date   createDate;

    @Transient
    private List   taskList;

    public String getSubjectView() {
        if (subject != null) {
            if (subject.length() > 20) {
                if (subject.indexOf(" ") < 0) {
                    return StringUtils.abbreviate(subject, 20);
                }
            }
        }
        return subject;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public List getTaskList() {
        return taskList;
    }

    public void setTaskList(List taskList) {
        this.taskList = taskList;
    }
}
