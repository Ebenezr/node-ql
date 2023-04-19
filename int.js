import React, { createContext, useContext, useState } from "react";
import {
  BarSongTitle,
  BottomBar,
  Button,
  PlayList,
  Song,
  SongTitle,
} from "./styles.js";
import { songList } from "./constants.js";

const PlayerContext = createContext();

const buttonLabels = ["Not replaying", "Replaying all", "Replaying one"];

const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentMode, setCurrentMode] = useState(0);

  return (
    <PlayerContext.Provider
      value={{ currentSong, setCurrentSong, currentMode, setCurrentMode }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayerContext must be used within a PlayerProvider");
  }
  return context;
};

const ControlBar = () => {
  const { currentSong, currentMode, setCurrentMode, setCurrentSong } =
    usePlayerContext();
  const title = currentSong
    ? `${currentSong.author} - ${currentSong.title}`
    : "";
  const changeMode = () => setCurrentMode((currentMode + 1) % 3);

  const handlePrevious = () => {
    if (!currentSong) return;

    const currentIndex = songList.findIndex(
      (song) => song.id === currentSong.id
    );
    if (currentMode === 2 || (currentMode === 0 && currentIndex === 0)) return;
    const newIndex = (currentIndex - 1 + songList.length) % songList.length;
    setCurrentSong(songList[newIndex]);
  };

  const handleNext = () => {
    if (!currentSong) return;

    const currentIndex = songList.findIndex(
      (song) => song.id === currentSong.id
    );
    if (currentMode === 2) return;
    if (currentMode === 0 && currentIndex === songList.length - 1) {
      setCurrentSong(null);
      return;
    }

    const newIndex = (currentIndex + 1) % songList.length;
    setCurrentSong(songList[newIndex]);
  };

  return (
    <BottomBar>
      <BarSongTitle data-testid="barTitle">{title}</BarSongTitle>
      <div>
        <Button data-testid="previousButton" onClick={handlePrevious}>
          Previous
        </Button>
        <Button data-testid="nextButton" onClick={handleNext}>
          Next
        </Button>
        <Button data-testid="currentModeButton" onClick={changeMode}>
          {buttonLabels[currentMode]}
        </Button>
      </div>
    </BottomBar>
  );
};

const Songs = () => {
  const { currentSong, setCurrentSong } = usePlayerContext();

  const handleClick = (song) => {
    setCurrentSong(song);
  };

  return (
    <PlayList>
      {songList.map((song) => (
        <Song key={song.id} onClick={() => handleClick(song)}>
          <SongTitle
            data-testid={song.id}
            active={currentSong && currentSong.id === song.id}
          >
            {song.title}
          </SongTitle>
          <p>{song.author}</p>
        </Song>
      ))}
    </PlayList>
  );
};

export { PlayerProvider, Songs, ControlBar };

function solution(board) {
  const rows = board.length;
  const cols = board[0].length;

  let count = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let aCount = 0;
      let bCount = 0;

      for (let r = 0; r <= row; r++) {
        for (let c = 0; c <= col; c++) {
          if (board[r][c] === "A") {
            aCount++;
          } else if (board[r][c] === "B") {
            bCount++;
          }
        }
      }

      if (aCount === bCount) {
        count++;
      }
    }
  }

  return count;
}

import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client"; // Add gql import here
import OfferTile from "./OfferTile.js";

export default function OfferListing() {
  const LOADING = "Loading offers";
  const ERROR = "Failed to load offers";

  const GET_OFFERS = gql`
    query GetOffers($limit: Int, $sort: Sort) {
      offers(limit: $limit, sort: $sort) {
        id
        name
        imageUrl
        value
        currency
        visitedCount
        description
      }
    }
  `;

  const MARK_VISITED = gql`
    mutation MarkVisited($offerId: String!) {
      markVisited(offerId: $offerId) {
        id
        visitedCount
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_OFFERS, {
    variables: { limit: 10, sort: { by: "DATE_ADDED", order: "DESC" } },
  });
  const [markVisited] = useMutation(MARK_VISITED);

  const handleTileClick = (offerId) => {
    markVisited({ variables: { offerId } });
  };

  if (loading) return <div>{LOADING}</div>;
  if (error) return <div>{ERROR}</div>;

  return (
    <>
      {data.offers.map((offer) => (
        <OfferTile
          key={offer?.id}
          name={offer?.name}
          visitedCount={offer?.visitedCount}
          price={`${offer?.value} ${offer.currency}`}
          imageUrl={offer?.imageUrl}
          description={offer.description ?? ""}
          clickHandler={() => handleTileClick(offer.id)}
        />
      ))}
          
    </>
  );
}
