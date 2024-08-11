package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.Set;

public interface RoleDao {
    Role findByName(String name);
    Role findById(Integer id);
    void save(Role role);
    void delete(Role role);
    Set<Role> findAll();
    Set<Role> getSetOfRoles(Set<String> roles);


}
