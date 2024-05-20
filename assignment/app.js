const load_all_data = () => {
  fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=Arsenal")
    .then((res) => res.json())
    .then((data) => {
      display_all_data(data.player);
    });
};
load_all_data();

const display_all_data = (data) => {
  console.log(data);
  const container = document.getElementById("all-player");
  data.forEach((player) => {
    console.log("Playr", player);
    const div = document.createElement("div");
    div.classList.add("single-player");
    div.innerHTML = `
         
        <img src=${player.strThumb} alt="" class="player-image">
        <h5>ID: ${player.idPlayer}</h5>
        <h6>Name: ${player.strPlayer} </h6>
        <h6>Country:${player.strNationality} </h6>
        <h6>Wage: ${player.strWage}</h6>
        <button  onclick="singlePlayer('${player.idPlayer}')"  class="btn btn-info details-btn" data-bs-toggle="modal" data-bs-target="#exampleModal"> Details </button>
        <button class="add-team-btn" id="add-team-button-${player.idPlayer}" onclick="add_to_team(${player.idPlayer})">Add to team </button> <br>
        <a href=${player.strInstagram} target="_blank" class="text-info m-1"><i class="fa-brands fa-instagram fa-2x"></i></a>
        <a href=${player.strTwitter}  target="_blank" class="text-info m-1"><i class="fa-brands fa-twitter fa-2x"></i></i></a>
       
        `;
    container.appendChild(div);
  });
};
var count = 0;

const add_to_team = (id) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then((res) => res.json())
    .then((player) => {
      console.log(player.players[0]);
      const container = document.getElementById("player-cart");
      const total = document.getElementById("total_team_members");

      const div = document.createElement("div");
      div.classList.add("cart_player");
      div.innerHTML = `
           <img src=${player.players[0].strThumb} class="cart-player-image">
           <h6>${player.players[0].strPlayer}</h6>
        `;
      container.appendChild(div);
      count += 1;
      total.innerText = `
        Team Members = ${count}
        `;
    });
};

const display_player_display = (pid) => {
  console.log(pid);
  fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${pid}`)
    .then((res) => res.json())
    .then((id) => {
      console.log(id);
      const modal = document.getElementById("modal-body");
      modal.addEventListener("show.bs.modal", (event) => {});
    });
};

const search_player = () => {
  const val = document.getElementById("search-btn").value;
  console.log(val);
  fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${val}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("all", data);

      data.player.forEach((player) => {
        const container = document.getElementById("seach-player");
        console.log("Playr", player);
        container.innerHTML = `
          <div class="single-player" id="search-player-1">           
          <img src=${player.strThumb} alt="" class="player-image" onclick=" remove_player()">
          <h5>ID: ${player.idPlayer}</h5>
          <h6>Name: ${player.strPlayer} </h6>
          <h6>Country:${player.strNationality} </h6>
          <h6>Wage: ${player.strWage}</h6>
          <button  onclick="singlePlayer('${player.idPlayer}')"  class="btn btn-info details-btn" data-bs-toggle="modal" data-bs-target="#exampleModal"> Details </button>
          <button class="add-team-btn" id="add-team-button-${player.idPlayer}" onclick="add_to_team(${player.idPlayer})">Add to team </button> <br>
          <a href=${player.strInstagram} target="_blank" class="text-info m-1"><i class="fa-brands fa-instagram fa-2x"></i></a>
          <a href=${player.strTwitter}  target="_blank" class="text-info m-1"><i class="fa-brands fa-twitter fa-2x"></i></i></a>
          </div>
          `;
      });
    });
};

const remove_player = () => {
  const player = document.getElementById("search-player-1");
  player.remove();
};

const display_modal = () => {
  const m = document.getElementById("modal");
  m.innerHTML = " ";
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="modal fade" id="player-modal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalScrollableTitle">
  <div class="modal-dialog modal-dialog-scrollable" role="document">
      <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="exampleModalScrollableTitle">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
              ...
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
          </div>
      </div>
  </div>
</div>
  `;
  m.appendChild(div);
  const modal_element = new boostrap.Modal(
    document.getElementById("player-modal")
  );
  modal_element.show();
};

const singlePlayer = (id) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      viewSingleProduct(data.players[0]);
    });
};

const viewSingleProduct = (player) => {
  const title = document.getElementById("single-player-title");
  const body = document.getElementById("single-player-body");
  console.log(player.strPlayer);
  title.innerText = player.strPlayer;

  body.innerHTML = `
  <div class="card " id="modal">
      <div class="row bg-dark g-0">
          <div class="col-md-4 d-flex justify-content-center align-items-center">
              <img src=${
                player.strThumb
              } class="img-fluid rounded-start" alt="...">
          </div>
          
          <div class="col-md-8">
              <div class="card-body">
                  <p class="card-title text-info">Place of Birth: ${
                    player.strBirthLocation
                  } </p>
                  <p class="card-title text-info">Nationality: ${
                    player.strNationality
                  } </p>
                  <p class="card-title text-info">Play: ${player.strSport} </p>
                  <p class="card-title text-info">Position: ${
                    player.strPosition
                  } </p>
                  <p class="text-white">${player.strDescriptionEN.slice(
                    0,
                    100
                  )}</p>
                  <p class="text-white"><small class="text-white">Gender: ${
                    player.strGender
                  } </small></p>
              </div>
          </div>
      </div>
  </div>
  `;
};
