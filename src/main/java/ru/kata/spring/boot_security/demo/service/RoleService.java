package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.Set;

public interface RoleService {
    Set<Role> getRoles();
    Role findByName(String name);
    Role findById(Integer id);
    void save(Role role);
    void delete(Role role);
    Set<Role> getSetOfRoles(Set<String> roles);
}
