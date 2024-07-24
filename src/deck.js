import React, { useEffect, useState } from "react";
import Card from "./cards";
import axios from "axios";
import "./deck.css";

const CARD_API = "https://deckofcardsapi.com/api/deck";

function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawnCards, setDrawnCards] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(function fetchInitialDeck() {
    async function fetchDeck() {
      const response = await axios.get(`${CARD_API}/new/shuffle/`);
      setDeck(response.data);
    }
    fetchDeck();
  }, []);

  async function drawCard() {
    try {
      const drawResponse = await axios.get(`${CARD_API}/${deck.deck_id}/draw/`);

      if (drawResponse.data.remaining === 0) throw new Error("Deck is empty!");

      const card = drawResponse.data.cards[0];

      setDrawnCards(prevDrawn => [
        ...prevDrawn,
        {
          id: card.code,
          name: card.suit + " " + card.value,
          image: card.image,
        },
      ]);
    } catch (error) {
      alert(error);
    }
  }

  async function shuffleDeck() {
    setIsShuffling(true);
    try {
      await axios.get(`${CARD_API}/${deck.deck_id}/shuffle/`);
      setDrawnCards([]);
    } catch (error) {
      alert(error);
    } finally {
      setIsShuffling(false);
    }
  }

  function renderDrawButton() {
    if (!deck) return null;

    return (
      <button
        className="Deck-draw"
        onClick={drawCard}
        disabled={isShuffling}>
        Draw
      </button>
    );
  }

  function renderShuffleButton() {
    if (!deck) return null;
    return (
      <button
        className="Deck-shuffle"
        onClick={shuffleDeck}
        disabled={isShuffling}>
        Shuffle
      </button>
    );
  }

  return (
    <main className="Deck">
      {renderDrawButton()}
      {renderShuffleButton()}
      <div className="Deck-cardarea">
        {drawnCards.map(card => (
          <Card key={card.id} name={card.name} image={card.image} />
        ))}
      </div>
    </main>
  );
}

export default Deck;
