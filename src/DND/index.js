import React, { useState } from "react";
import "./style.css";

function DND() {
  const [cards, setCards] = useState([
    { id: "001", order: 1, name: "Карта 1" },
    { id: "002", order: 2, name: "Карта 2" },
    { id: "003", order: 3, name: "Карта 3" },
    { id: "004", order: 4, name: "Карта 4" },
  ]);

  const [currentCard, setCurrentCard] = useState(null);

  function onStartHandler(e, card) {
    setCurrentCard(card);
  }

  function onEndHandler(e) {
    e.target.style.background = "white";
  }
  function onOverHandler(e) {
    e.preventDefault();
    e.target.style.background = "rgb(179, 180, 179)";
  }

  function onDropHandler(e, card) {
    e.preventDefault();
    e.target.style.background = "white";

    setCards(
      cards.map((item) => {
        if (item.id === card.id) {
          return { ...item, order: currentCard.order };
        }
        if (item.id === currentCard.id) {
          return { ...item, order: card.order };
        }
        return item;
      })
    );
  }

  const cardSort = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <>
      <div className="App"> Drag and Drop </div>

      <div className="container">
        <div className="row justify-content-center  card_container">
          {cards.sort(cardSort).map((card) => (
            <div
              key={card.id}
              className="card_item"
              draggable={true}
              onDragStart={(e) => onStartHandler(e, card)}
              onDragLeave={(e) => onEndHandler(e)}
              onDragEnd={(e) => onEndHandler(e)}
              onDragOver={(e) => onOverHandler(e)}
              onDrop={(e) => onDropHandler(e, card)}
            >
              {card.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DND;
