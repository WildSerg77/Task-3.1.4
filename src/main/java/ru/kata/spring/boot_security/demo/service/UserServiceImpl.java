package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.dao.UserDao;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserDetailsService, UserService {
    private final UserDao userDao;
    private final RoleService roleService;
    private final PasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(UserDao userDao, RoleService roleService, PasswordEncoder bCryptPasswordEncoder) {
        this.userDao = userDao;
        this.roleService = roleService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public User findByUsername(String username) {
        return userDao.findByUsername(username);
    }

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User '" + username + "' not found");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                mapRolesToAuthorities(user.getRoles()));

    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) {
        return roles.stream().map(r -> new SimpleGrantedAuthority(r.getName())).toList();
    }

    @Transactional(readOnly = true)
    @Override
    public User findUserById(Integer userId) {
        Optional<User> userFromDb = Optional.ofNullable(userDao.findById(userId));
        return userFromDb.orElse(new User());
    }

    @Transactional(readOnly = true)
    @Override
    public List<User> allUsers() {
        return userDao.findAll();
    }

    @Transactional
    @Override
    public User saveUser(User user) {
        if (user.getId() != null) {
            User existingUser = findUserById(user.getId());
            if (!bCryptPasswordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
                user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            } else {
                user.setPassword(existingUser.getPassword());
            }
        } else {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        }
        return userDao.save(user);
    }

    @Transactional
    @Override
    public void deleteUser(Integer userId) {
        userDao.deleteById(userId);
    }

}
