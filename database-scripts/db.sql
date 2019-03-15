CREATE TABLE player 
(
    id uuid PRIMARY KEY,
    name varchar(255) NOT NULL
)

CREATE TABLE match 
(
    id uuid PRIMARY KEY,
    player_1 uuid REFERENCES player(id),
    player_2 uuid REFERENCES player(id),
    match_complete_date date
)
