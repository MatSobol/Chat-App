package com.backend.chirp.DTO;

import lombok.Data;

import java.util.List;

@Data
public class UserDTO {
    private String name;
    private String email;
    private List<FriendDTO> friends;
}
