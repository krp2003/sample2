package com.wecp.financial_seminar_and_workshop_management.controller;


import com.wecp.financial_seminar_and_workshop_management.dto.LoginRequest;
import com.wecp.financial_seminar_and_workshop_management.dto.LoginResponse;
import com.wecp.financial_seminar_and_workshop_management.entity.User;
import com.wecp.financial_seminar_and_workshop_management.jwt.JwtUtil;
import com.wecp.financial_seminar_and_workshop_management.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class RegisterAndLoginController {

    @Autowired private UserService userService;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtUtil jwtUtil;

    @PostMapping("/api/user/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User saved = userService.register(user);
        return ResponseEntity.ok(saved);
    }

    // @PostMapping("/api/user/login")
    // public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest) {
    //     try {
    //         authenticationManager.authenticate(
    //                 new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
    //         );
    //     } catch (AuthenticationException ex) {
    //         return ResponseEntity.status(401).build(); // 401 Unauthorized
    //     }

    //     User user = userService.getByUsername(loginRequest.getUsername());
    //     UserDetails userDetails = userService.loadUserByUsername(user.getUsername());
    //     String token = jwtUtil.generateToken(userDetails);

    //     LoginResponse resp = new LoginResponse(
    //             user.getId(), // if your LoginResponse uses getUserId/setUserId naming
    //             token,
    //             user.getUsername(),
    //             user.getEmail(),
    //             user.getRole()
    //     );
    //     return ResponseEntity.ok(resp);
    // }

    @PostMapping("/api/user/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(401).build(); // Unauthorized
        }
    
        UserDetails userDetails = userService.loadUserByUsername(loginRequest.getUsername());
        User u = userService.getByUsername(loginRequest.getUsername());
        String token = jwtUtil.generateToken(loginRequest.getUsername());

        String role = u.getRole();
        Long userId = u.getId();
        System.out.println("User Roles: " + role);
        return ResponseEntity.ok(new LoginResponse(token, role, userId));
    }
}
