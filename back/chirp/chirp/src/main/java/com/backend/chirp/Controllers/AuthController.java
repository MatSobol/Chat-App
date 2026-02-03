package com.backend.chirp.Controllers;

import com.backend.chirp.DTO.LoginDTO;
import com.backend.chirp.DTO.RegisterDto;
import com.backend.chirp.Entities.User;
import com.backend.chirp.Repository.UserRepository;
import com.backend.chirp.Services.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginDTO login) {
        User user = userRepository.findByEmail(login.getEmail());
        if(user == null || !passwordEncoder.matches(login.getPassword(), user.getPassword())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body( "Email or password is incorrect");
        }
        return ResponseEntity.ok().body(jwtService.generateToken(login.getEmail()));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterDto register){
        if (userRepository.findByEmail(register.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body( "Email already taken");
        }

        String hashedPassword = passwordEncoder.encode(register.getPassword());
        User user = new User();
        user.setEmail(register.getEmail());
        user.setName(register.getName());
        user.setPassword(hashedPassword);

        userRepository.save(user);

        return ResponseEntity.ok().body(jwtService.generateToken(register.getEmail()));
    }
}
