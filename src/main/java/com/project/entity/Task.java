package com.project.entity;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.apache.commons.lang.StringUtils;

@Entity
@Table(name = "task")
public class Task extends BaseEntity {
    private String title;
    @Transient
    private String titleView;
    private Date   startTime;
    private String status;
    private Date   endTime;

    private Long   projectId;

    public String getTitleView() {
        if (title != null) {
            if (title.length() > 100) {
                if (title.indexOf(" ") < 0) {
                    return StringUtils.abbreviate(title, 100);
                }
            }
        }
        return title;
    }

    public String getStartTimeView() {
        String s = "";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (startTime != null) {
            s = sdf.format(startTime);
        }
        if (endTime != null) {
            s = s + " to " + sdf.format(endTime);
        }
        return s;
    };

    public String getEndTimeView() {
        if (endTime == null) {
            return "";
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(endTime);
    };

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }
}
