#! /usr/bin/env node

  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Player = require("./models/player");
  const Team = require("./models/team");
  const Owner = require("./models/owner");
  const Position = require("./models/position");
  
  const players = [];
  const teams = [];
  const owners = [];
  const positions = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createTeams();
    await createPositions();
    await createOwners();
    await createPlayers();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function teamCreate(index, location, name, championships) {
    const team = new Team({ location, name, championships });
    await team.save();
    teams[index] = team;
    console.log(`Added team: ${team.teamName}`);
  }
  
  async function positionCreate(index, position) {
    const pos = new Position({ position });
    await pos.save();
    positions[index] = pos;
    console.log(`Added position: ${pos.position}`);
  }
  
  async function playerCreate(index, firstName, lastName, team, position, height, weight, number) {
    const player = new Player({
        firstName,
        lastName,
        team,
        position,
        height,
        weight,
        number
      });
    await player.save();
    players[index] = player;
    console.log(`Added player: ${player.fullName}`);
  }
  
  async function ownerCreate(index, firstName, lastName, team, netWorth) {
    const owner = new Owner({ firstName, lastName, team, netWorth });
    await owner.save();
    owners[index] = owner;
    console.log(`Added owner: ${owner.fullName}`);
  }
  
  async function createTeams() {
    console.log("Adding teams");
    await Promise.all([
      teamCreate(0, "New York", "Knicks", [1970, 1973]),
      teamCreate(1, "Brooklyn", "Nets", []),
      teamCreate(2, "Boston", "Celtics", [
        1957, 1959, 1960, 1961, 1962,
        1963, 1964, 1965, 1966, 1968,
        1969, 1974, 1976, 1981, 1984,
        1986, 2008
      ]),
      teamCreate("3", "Los Angeles", "Lakers", [
        1949, 1950, 1952, 1953, 1954,
        1972, 1980, 1982, 1985, 1987,
        1988, 2000, 2001, 2002, 2009,
        2010, 2020
      ])
    ]);
  }
  
  async function createPositions() {
    console.log("Adding positions");
    await Promise.all([
      positionCreate(0, "Point Guard"),
      positionCreate(1, "Shooting Guard"),
      positionCreate(2, "Small Forward"),
      positionCreate(3, "Power Forward"),
      positionCreate(4, "Center"),
    ]);
  }
  
  
  async function createPlayers() {
    console.log("Adding players");
    await Promise.all([
      playerCreate(0,
        "Jalen",
        "Brunson",
        teams[0],
        positions[0],
        "6'2",
        190,
        11,
      ),
      playerCreate(1,
        "Mikal",
        "Bridges",
        teams[1],
        positions[2],
        "6'6",
        209,
        1,
      ),
      playerCreate(2,
        "Jayson",
        "Tatum",
        teams[2],
        positions[2],
        "6'8",
        210,
        0,
      ),
      playerCreate(3,
        "LeBron",
        "James",
        teams[3],
        positions[2],
        "6'9",
        250,
        23,
      ),
    ]);
  }
  
  async function createOwners() {
    console.log("Adding owners");
    await Promise.all([
      ownerCreate(0, "James", "Dolan", teams[0], "$2,000,000,000"),
      ownerCreate(1, "Joe", "Tsai", teams[1], "$8,1000,000,000"),
      ownerCreate(2, "Wyc", "Grousbeck", teams[2], "$4,000,000,000"),
      ownerCreate(3, "Jeanie", "Buss", teams[3], "$500,000,000"),
    ]);
  }