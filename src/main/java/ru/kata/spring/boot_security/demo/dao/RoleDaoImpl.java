package ru.kata.spring.boot_security.demo.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.Role;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Repository
public class RoleDaoImpl implements RoleDao {
    @PersistenceContext
    private EntityManager em;
    @Override
    public Role findByName(String role) {
        return em.createQuery("SELECT r FROM Role r WHERE r.name=:role", Role.class).setParameter("role", role).getSingleResult();
    }

    @Override
    public void save(Role role) {
        em.merge(role);
    }

    @Override
    public void delete(Role role) {
        em.remove(em.contains(role)? role : em.merge(role));
    }

    @Override
    public Set<Role> findAll() {
        List<Role> roles = em.createQuery("SELECT r FROM Role r", Role.class).getResultList();
        return new HashSet<>(roles);
    }

    @Override
    public Role findById(Integer id) {
        return em.find(Role.class, id);
    }

    @Override
    public Set<Role> getSetOfRoles(Set<String> roles) {
        Set<Role> roleSet = new HashSet<>();
        for (String role : roles) {
            roleSet.add(findByName(role));
        }
        return roleSet;
    }
}
