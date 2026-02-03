package com.backend.chirp.Repository;

import com.backend.chirp.Const.FriendShipStatus;
import com.backend.chirp.Entities.FriendShip;
import com.backend.chirp.Entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface FriendShipRepository extends JpaRepository<FriendShip, Long> {
    @Modifying
    @Transactional
    @Query("""
        UPDATE FriendShip f
        SET f.status = :status
        WHERE f.sender.id = :senderId
          AND f.receiver.id = :receiverId
          AND f.status = 'PENDING'
    """)
    int updateStatus(
            Long senderId,
            Long receiverId,
            FriendShipStatus status
    );
}
