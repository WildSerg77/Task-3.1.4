package ru.kata.spring.boot_security.demo.model;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class StringSetToRoleSetConverter implements Converter<Set<String>, Set<Role>> {

    private final StringToRoleConverter stringToRoleConverter;

    public StringSetToRoleSetConverter(StringToRoleConverter stringToRoleConverter) {
        this.stringToRoleConverter = stringToRoleConverter;
    }

    @Override
    public Set<Role> convert(Set<String> source) {
        return source.stream()
                .map(stringToRoleConverter::convert)
                .collect(Collectors.toSet());
    }
}
