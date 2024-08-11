package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.model.User;
import java.util.List;


public interface UserDao {
    User findById(Integer id);
    List<User> findAll();
    void save(User user);
    void deleteById(Integer id);
    User findByUsername(String username);

}
