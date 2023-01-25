package com.mindhub.homebanking.service;

import com.mindhub.homebanking.dtos.CardDTO;
import com.mindhub.homebanking.models.Card;
import com.mindhub.homebanking.models.Enums.CardType;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface CardService {

    public void saveCard(Card card);

    public Card findByNumber(String number);
    public Card findByType(CardType type);

    public CardDTO getCard( Long id);

    public List<CardDTO> getCards();
}
