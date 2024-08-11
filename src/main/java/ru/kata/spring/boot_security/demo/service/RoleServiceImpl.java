package ru.kata.spring.boot_security.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.dao.RoleDao;
import ru.kata.spring.boot_security.demo.model.Role;

import java.util.Set;

@Service
public class RoleServiceImpl implements RoleService {
    private final RoleDao roleDao;

    public RoleServiceImpl(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    @Override
    @Transactional(readOnly = true)
    public Set<Role> getRoles() {
        return roleDao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Role findByName(String name) {
        return roleDao.findByName(name);
    }

    @Override
    @Transactional(readOnly = true)
    public Role findById(Integer id) {
        return roleDao.findById(id);
    }

    @Override
    @Transactional
    public void save(Role role) {
        roleDao.save(role);
    }

    @Override
    @Transactional
    public void delete(Role role) {
        roleDao.delete(role);
    }

    @Override
    public Set<Role> getSetOfRoles(Set<String> roles) {
        return roleDao.getSetOfRoles(roles);
    }
}
