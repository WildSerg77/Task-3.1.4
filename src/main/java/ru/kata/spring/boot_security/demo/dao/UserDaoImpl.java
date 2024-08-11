package ru.kata.spring.boot_security.demo.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {
    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public User findById(Integer id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public List<User> findAll() {
        return entityManager.createQuery("SELECT u FROM User u", User.class).getResultList();
    }

    @Override
    public void save(User user) {
        entityManager.merge(user);
    }

    @Override
    public void deleteById(Integer id) {
        entityManager.remove(entityManager.find(User.class, id));
    }

    @Override
    public User findByUsername(String username) {
        return entityManager.createQuery(
                "SELECT u FROM User u join fetch u.roles WHERE u.username =:username", User.class)
                .setParameter("username", username).getSingleResult();
    }
}
