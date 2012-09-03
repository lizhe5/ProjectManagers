package com.project.dao;

import com.project.entity.Task;

public class TaskDao extends BaseHibernateDao<Task> {
    public Task saveTask(Task po) {
        super.save(po);
        return po;
    }
}
