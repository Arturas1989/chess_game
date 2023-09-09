
import './App.css';
import themes from './themes/themes.js';
import { useState, forwardRef } from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

const pieces = themes.standard.pieces;
const squareColors = themes.standard.colors; 
function GameContainer() {
  return (
    <div className="GameContainer">
      <Board />
      <MoveList />
    </div>
  );
}

function MoveList(){
  return (
    <div className="MoveList"></div>
  );
}

function Board() {

  const [piecePositions, setPiecePositions] = useState(
    {
      '0,0' : 'R', '0,1' : 'N', '0,2' : 'B', '0,3' : 'Q', '0,4' : 'K', '0,5' : 'B', '0,6' : 'N', '0,7' : 'R',
      '1,0' : 'P', '1,1' : 'P', '1,2' : 'P', '1,3' : 'P', '1,4' : 'P', '1,5' : 'P', '1,6' : 'P', '1,7' : 'P',
      '7,0' : 'r', '7,1' : 'n', '7,2' : 'b', '7,3' : 'q', '7,4' : 'k', '7,5' : 'b', '7,6' : 'n', '7,7' : 'r',
      '6,0' : 'p', '6,1' : 'p', '6,2' : 'p', '6,3' : 'p', '6,4' : 'p', '6,5' : 'p', '6,6' : 'p', '6,7' : 'p'
    }
  );

  const [isDragging, setIsDragging] = useState(false);
  const [draggablePiece, setDraggablePiece] = useState('');
  

  const handleDragStart = (start) => {
    console.log(1)
    setIsDragging(true);
    setDraggablePiece(start.draggableId);
  }

  const handleDragEnd = () => {
    setIsDragging(false);
    console.log('drag and drop event occured');
  }

  const handleDragUpdate = (update) => {
    // console.log(update);
  }
  console.log(draggablePiece)
  return (
    <DragDropContext onDragEnd = {handleDragEnd} onDragStart = {handleDragStart} onDragUpdate = {handleDragUpdate}>
      
      <div className="Board">
        
        {Array.from({length: 64}, (_,i) => {

          const row = Math.floor(i / 8);
          const mod = row % 2;
          const revRow = 7 - row;
          const col = i % 8;
          const pos = revRow + ',' + col;
          const style = {
            backgroundColor: i % 2 === mod ? squareColors.white : squareColors.black,
          };
          if(pos === draggablePiece && isDragging) style.backgroundColor='yellow';
          return (
            <Droppable droppableId={pos} type='Square' key={pos}>
              {(provided) => (
                <div className='Square-contaner' {...provided.droppableProps} ref={provided.innerRef}>

                  <Square
                    key={i}
                    index={i} 
                    pos={pos}
                    style={style}
                    isDragging={isDragging} 
                    piecePositions={piecePositions}
                    onPiecePositionsChange={setPiecePositions}
                  />
                  <div className='hidden'>
                    {provided.placeholder}
                  </div>
                </div>
                
                
              )}
              
            </Droppable>
          )
           

        })}
      </div>
    </DragDropContext>
    
  );
}

const Square = forwardRef(({ index, pos, style, isDragging, piecePositions, onPiecePositionsChange }, ref) => {
  
  
  const piece = piecePositions[pos] || '';
  

  const handleDragOver = () => {
    console.log('abc');
  }
  
  const [activePiece, setActivePiece] = useState('');
  const handleMouseEnter = (e) => {

    if(!isDragging){
      console.log('set',e.target.id)
      setActivePiece(e.target.id);
    }
     
  }

  const handleMouseLeave = (e) => {

    if(!isDragging){
      console.log('set',e.target.id)
      setActivePiece('');
    }
     
  }

  console.log(activePiece, isDragging)
  
  return (
    <div className='Square' style={style}>
      {pos === activePiece || activePiece === '' ? (
        <Draggable draggableId={pos} key={pos} index={index}>
          {(provided, snapshot) => (
            <img
              {...provided.dragHandleProps}
              {...provided.draggableProps} 
              ref={provided.innerRef}
              id={pos}
              src={pieces[piece]} 
              alt={pieces[piece]}
              onMouseEnter={(e) => handleMouseEnter(e)}
              onMouseLeave={(e) => handleMouseLeave(e)}
            />
          )}
        </Draggable>
      ) : (
        pieces[piece] && (
          <img
            id={pos}
            src={pieces[piece]} 
            alt={pieces[piece]}
            onMouseEnter={(e) => handleMouseEnter(e)}
          />
        )
      )}
    </div> 
  );
})

export default GameContainer;
