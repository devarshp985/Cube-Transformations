import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { generateUUID } from "three/src/math/MathUtils";
import Card from "./Card";

function Container(props) {
  const { state, send } = props;

  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({
    id: generateUUID(),
    px: 0,
    py: 0,
    pz: 0,
    rx: 0,
    ry: 0,
    rz: 0,
  });

  //setCards(state.context.schedule.cards);

  // This is hacky but time ran out, couldn't find another solution
  const updateState = (specifiedCards) => {
    if (specifiedCards) {
      send({ type: "UPDATESCHEDULE", scheduleCards: specifiedCards });
    } else {
      send({ type: "UPDATESCHEDULE", scheduleCards: cards });
    }
  };

  const handleAddCard = () => {
    setNewCard({
      id: generateUUID(),
      px: 0,
      py: 0,
      pz: 0,
      rx: 0,
      ry: 0,
      rz: 0,
    });
    cards.push(newCard);
    setCards(cards);
    updateState();
  };

  // Update cards ui to match the state machine schedule context
  const contextCards = state.context.schedule.cards;

  if (cards.length === 1 && contextCards.length === 0) {
    cards.shift();
    setCards(cards);
  }

  for (let i = 0; i < contextCards.length; i++) {
    if (cards[i].id === contextCards[i].id) {
      break;
    }
    cards.splice(i, 1);
    setCards(cards);
  }

  const handleRemoveCard = (cardId) => {
    const newCards = cards.filter((card) => card.id !== cardId);
    setCards(newCards);
    updateState(newCards);
  };

  const handleUpdateCardPosition = (result) => {
    // Update the position of a card in the list after it is dragged
    const { source, destination } = result;

    if (!destination || source.index === destination.index) {
      return; // Card was dropped outside the list
    }

    const newCards = [...cards];
    const [removed] = newCards.splice(source.index, 1);

    newCards.splice(destination.index, 0, removed);
    setCards(newCards.map((card) => ({ ...card })));
    updateState(newCards);
  };

  const handleExecuteListCommands = () => {
    send({ type: "RUNSCHEDULE", run: true });
  };

  return (
    <div className="controls2">
      <h1>Scheduler</h1>
      <h2>Schedule Running? {state.context.scheduleRunning.toString()}</h2>
      <h2> </h2>
      <div className="buttons">
        <button onClick={handleAddCard}>Add Card</button>
        <button onClick={handleExecuteListCommands}>Execute</button>
      </div>

      <DragDropContext onDragEnd={handleUpdateCardPosition}>
        {cards.map((card, index) => (
          <Droppable key={String(card.id)} droppableId={String(card.id)}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Draggable
                  key={String(card.id)}
                  draggableId={String(card.id)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="card"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Card
                        px={card.px}
                        py={card.py}
                        pz={card.pz}
                        rx={card.rx}
                        ry={card.ry}
                        rz={card.rz}
                        onInput={(updatedCard) => {
                          const newCards = [...cards];
                          newCards[index] = {
                            ...newCards[index],
                            ...updatedCard,
                          };
                          setCards(newCards);
                          updateState(newCards);
                        }}
                        state={state}
                      />
                      <button onClick={() => handleRemoveCard(card.id)}>
                        X
                      </button>
                    </div>
                  )}
                </Draggable>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}

export default Container;
