package com.project.web;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import com.britesnow.snow.web.RequestContext;
import com.britesnow.snow.web.handler.annotation.WebActionHandler;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.google.inject.Inject;
import com.project.dao.TaskDao;
import com.project.entity.Task;

/**
 * 
 * @author lizhe
 */
public class TaskAcitonHandler {
    @Inject
    private TaskDao taskDao;

    @WebActionHandler(name = "createTask")
    public Map createTask(@WebParam("id") Long id, @WebParam("projectId") Long projectId,
                            @WebParam("title") String title, @WebParam("status") String status, RequestContext rc) {
        Map resultMap = new HashMap();
        try {
            Task po = new Task();
            if (id != null) {
                taskDao.get(id);
            }
            po.setTitle(title);
            po.setStartTime(new Timestamp(System.currentTimeMillis()));
            po.setStatus(status);
            po.setProjectId(projectId);
            if (po.getId() != null) {
                taskDao.update(po);
            } else {
                taskDao.save(po);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resultMap;
    }

    @WebActionHandler(name = "opTask")
    public Map opTask(@WebParam("id") Long id, @WebParam("op") String op, RequestContext rc) {
        Map resultMap = new HashMap();
        try {
            Task po = taskDao.get(id);
            if ("end".equals(op)) {
                po.setStatus("End");
                po.setEndTime(new Timestamp(System.currentTimeMillis()));
                taskDao.update(po);
            }
            if ("del".equals(op)) {
                taskDao.delete(po);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resultMap;
    }
}
