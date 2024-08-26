package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Set;

public interface UserService {
    User findUserById (Integer id);
    List<User> allUsers();
    User saveUser(User user);
    void deleteUser(Integer id);
    User findByUsername(String username);

}
