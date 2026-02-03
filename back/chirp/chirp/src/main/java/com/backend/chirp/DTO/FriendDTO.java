package com.backend.chirp.DTO;

import com.backend.chirp.Const.FriendShipStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FriendDTO {
    private String friendEmail;
    private FriendShipStatus status;
}
