package com.project.dao;

import java.util.List;

import com.project.entity.Project;

public class ProjectDao extends BaseHibernateDao<Project> {
    public Project getProjectById(Long id) {
        Project po = get(id);
        if (po != null) {
            String hql = "from Task where projectId=?";
            List ls = daoHelper.find(0, 100, hql, id);
            po.setTaskList(ls);
        }
        return po;
    }

    public Project saveProject(Project po) {
        super.save(po);
        
        return po;
    }

    public void deleteProjectTask(Long projectId) {
        String hql = "delete  from Task t where t.projectId = ? ";
        daoHelper.executeHql(hql, projectId);
    }
}
