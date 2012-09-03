package com.project.web;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.britesnow.snow.web.RequestContext;
import com.britesnow.snow.web.handler.annotation.WebActionHandler;
import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebModel;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.google.inject.Inject;
import com.project.dao.ProjectDao;
import com.project.entity.Project;

/**
 * 
 * @author lizhe
 */
public class ProjectAcitonHandler {
    @Inject
    private ProjectDao projectDao;

    @WebModelHandler(startsWith = "/getProjectList")
    public void getProjectList(@WebModel Map m) {
        String hql = "from Project";
        List reList = projectDao.search(hql);
        m.put("projectList", reList);
    }

    @WebModelHandler(startsWith = "/getProjectById")
    public void getProjectById(@WebModel Map m, @WebParam("id") Long id) {
        Project po = projectDao.getProjectById(id);
        m.put("result", po);
    }

    @WebActionHandler(name = "createProject")
    public Map createProject(@WebParam("id") Long id, @WebParam("subject") String subject,
                            @WebParam("desc") String desc, RequestContext rc) {
        Map resultMap = new HashMap();
        try {
            Project po = new Project();
            if (id != null) {
                projectDao.get(id);
            }
            po.setDescription(desc);
            po.setSubject(subject);
            po.setCreateDate(new Date());
            if (po.getId() != null) {
                projectDao.update(po);
            } else {
                projectDao.save(po);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resultMap;
    }
}
