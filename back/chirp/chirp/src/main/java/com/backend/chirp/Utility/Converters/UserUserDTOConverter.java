package com.backend.chirp.Utility.Converters;

import com.backend.chirp.Const.FriendShipStatus;
import com.backend.chirp.DTO.FriendDTO;
import com.backend.chirp.DTO.UserDTO;
import com.backend.chirp.Entities.FriendShip;
import com.backend.chirp.Entities.User;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class UserUserDTOConverter implements Converter<User, UserDTO> {

    @Override
    public UserDTO convert(User from) {
        if (from == null) {
            return null;
        }

        UserDTO userDTO = new UserDTO();
        userDTO.setName(from.getName());
        userDTO.setEmail(from.getEmail());

        List<FriendDTO> friends = Stream.concat(
                        from.getReceivedRequests().stream()
                                .map(f -> new FriendDTO(
                                        f.getSender().getEmail(),
                                        f.getStatus()
                                )),
                        from.getSenderRequests().stream()
                                .filter(f -> (f.getStatus() == FriendShipStatus.ACCEPTED))
                                .map(f -> new FriendDTO(
                                        f.getReceiver().getEmail(),
                                        f.getStatus()
                                ))
                )
                .collect(Collectors.toList());
        userDTO.setFriends(friends);

        return userDTO;
    }
}
