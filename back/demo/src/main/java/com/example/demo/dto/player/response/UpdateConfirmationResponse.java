package com.example.demo.dto.player.response;

import com.example.demo.domain.player.Player;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class UpdateConfirmationResponse {
    private final String playerId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private final LocalDateTime updatedAt;

    public UpdateConfirmationResponse(Player player) {
        this.playerId = player.getPlayerId();
        this.updatedAt = player.getUpdatedAt();
    }
}
