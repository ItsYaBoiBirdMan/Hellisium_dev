window.onload = async function() {
    let userInfo = await getUserInfo();
    document.getElementById("username").innerHTML = userInfo.ply_name;   
    await fillRooms();
}

async function fillRooms() {
    try {
        let rooms = await getRooms();
        let html = "";
        for(let room of rooms) {
            html+=`<section onclick=openRoom(${room.room_id})>
                      <h3>${room.room_name}</h3>
                   </section>`
        }
        document.getElementById("rooms").innerHTML = html;
    } catch (err) {
        console.log(err);
    }
}

function openRoom(id) {
    sessionStorage.setItem("roomId",id);
    window.location = "game.html"
}