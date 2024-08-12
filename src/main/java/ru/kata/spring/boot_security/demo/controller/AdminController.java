package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.Set;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;

    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public String userList(Model model) {
        model.addAttribute("users", userService.allUsers());
        return "admin";
    }

    @GetMapping("/user-create")
    public String registration(@ModelAttribute("user") User user, Model model) {
        model.addAttribute("roles", roleService.getRoles());
        return "registration";
    }

    @PostMapping("/user-create")
    public String addUser(@ModelAttribute("user") User user, @RequestParam("roles") Set<String> roles) {
        userService.saveUser(user, roles);
        return "redirect:/admin";
    }

    @GetMapping("/{id}/edit")
    public String editUserForm(Model model, @PathVariable("id") Integer id) {
        model.addAttribute("roles", roleService.getRoles());
        model.addAttribute("user", userService.findUserById(id));
        return "user-edit";
    }

    @PatchMapping("/{id}/edit")
    public String update(@ModelAttribute("user") User user
            , @RequestParam(value = "roles") Set<String> roles) {
        userService.saveUser(user, roles);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}/delete")
    public String deleteUserById(@PathVariable("id") Integer id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }
}
