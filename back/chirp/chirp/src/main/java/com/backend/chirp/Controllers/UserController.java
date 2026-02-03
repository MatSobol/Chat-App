package com.backend.chirp.Controllers;

import com.backend.chirp.Const.FriendShipStatus;
import com.backend.chirp.DTO.RegisterDto;
import com.backend.chirp.DTO.UserDTO;
import com.backend.chirp.Entities.FriendShip;
import com.backend.chirp.Entities.User;
import com.backend.chirp.Repository.FriendShipRepository;
import com.backend.chirp.Repository.UserRepository;
import com.backend.chirp.Utility.Converters.UserUserDTOConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;
    private final FriendShipRepository friendShipRepository;
    private final UserUserDTOConverter userUserDTOConverter;

    @GetMapping()
    public ResponseEntity<Object> getUser() {
        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not longer exists");
        } else {
            UserDTO userDTO = userUserDTOConverter.convert(user);
            return ResponseEntity.ok().body(userDTO);
        }
    }

    @PostMapping("/send")
    public ResponseEntity sendRequest(@RequestBody String email) {
        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getName());
        System.out.println(email);

        User sender = userRepository.findByEmail(auth.getName());
        User receiver = userRepository.findByEmail(email);
        if (sender == null || receiver == null) {
            return ResponseEntity.badRequest().body("Couldn't find account");
        }
        FriendShip friend = new FriendShip();
        friend.setReceiver(receiver);
        friend.setSender(sender);
        friend.setStatus(FriendShipStatus.PENDING);
        friendShipRepository.save(friend);
        return ResponseEntity.ok().body("Success");
    }

    @PostMapping("/accept")
    public ResponseEntity acceptRequest(@RequestBody String email) {
        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();
        User receiver = userRepository.findByEmail(auth.getName());
        User sender = userRepository.findByEmail(email);
        if (sender == null || receiver == null) {
            return ResponseEntity.badRequest().body("Couldn't find account");
        }
        friendShipRepository.updateStatus(sender.getId(), receiver.getId(), FriendShipStatus.ACCEPTED);
        return ResponseEntity.ok().body("Success");
    }
}
