package com.backend.chirp.Controllers;

import com.backend.chirp.Const.FriendShipStatus;
import com.backend.chirp.DTO.UserDTO;
import com.backend.chirp.Entities.FriendShip;
import com.backend.chirp.Entities.User;
import com.backend.chirp.Repository.FriendShipRepository;
import com.backend.chirp.Repository.UserRepository;
import com.backend.chirp.Utility.Converters.UserUserDTOConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/friends")
public class FriendController {

    private final UserRepository userRepository;
    private final FriendShipRepository friendShipRepository;

    @PostMapping("/send")
    public ResponseEntity sendRequest(@RequestBody String email) {
        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

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
