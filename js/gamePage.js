const startTimerBtn = document.querySelector("#startButton");
const closeModalBtn = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");

let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");

var stream;
var timer;
var timerSeconds;

<<<<<<< Updated upstream
const minute = document.querySelector('#minute');
const second = document.querySelector('#second');

var needle = require('needle');

startTimerBtn.addEventListener('click', () => {
	clearInterval(timerSeconds);
	second.innerHTML = "00";
	minute.innerHTML = "00";
    modal.showModal();
})

closeModalBtn.addEventListener('click', () => {
    stream.getTracks().forEach(track => track.stop())
    modal.close();

	var sec = 0;
	var min = 0;

	timerSeconds = setInterval(() => {
		if ( sec < 10 ) {
			second.innerHTML = "0"+sec;
		}
		else {
			second.innerHTML = sec;
		}
		sec++;

		if ( sec == 61) {
			sec = 0;
			second.innerHTML = "0"+sec;
			min++;
			if ( min < 10 ) {
				minute.innerHTML = "0"+min;
			}
			else {
				minute.innerHTML = min;
			}
		}

		if ( min == 20 ) {
			pushNotif();
		}

		}, 1000);

})
=======
const minute = document.querySelector("#minute");
const second = document.querySelector("#second");
>>>>>>> Stashed changes

startTimerBtn.addEventListener("click", () => {
  clearInterval(timerSeconds);
  second.innerHTML = "00";
  minute.innerHTML = "00";
  modal.showModal();
});

closeModalBtn.addEventListener("click", () => {
  stream.getTracks().forEach((track) => track.stop());
  modal.close();

  var sec = 0;
  var min = 0;

  timerSeconds = setInterval(() => {
    if (sec < 10) {
      second.innerHTML = "0" + sec;
    } else {
      second.innerHTML = sec;
    }
    sec++;

    if (sec == 61) {
      sec = 0;
      second.innerHTML = "0" + sec;
      min++;
      if (min < 10) {
        minute.innerHTML = "0" + min;
      } else {
        minute.innerHTML = min;
      }
    }

    if (min == 20) {
      pushNotif();
    }
  }, 1000);
});

camera_button.addEventListener("click", async function () {
  stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  video.srcObject = stream;
});

<<<<<<< Updated upstream
	var data = {
		file : image_data_url,
		content_type: 'image/jpeg'
	}

	needle.get('', function(error, response) {
	if (!error && response.statusCode == 200)
		console.log(response.body);
	});

	pushNotif();
   	// data url of the image
   	console.log(image_data_url);
=======
click_button.addEventListener("click", function () {
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  let image_data_url = canvas.toDataURL("image/jpeg");

  var data = {
    image: image_data_url,
  };

  const needle = require("needle");

  needle("post", "https://physicoapi.azurewebsites.net/url", data, {
    json: true,
  })
    .then((res) => {
      console.log(`Status: ${res.statusCode}`);
      console.log("Body: ", res.body);
    })
    .catch((err) => {
      console.error(err);
    });
  pushNotif();

  //console.log(upload);
>>>>>>> Stashed changes
});

function pushNotif() {
  var exercise = "ASBVASD";

  let n = new Notification("REMINDER", {
    body: exercise,
    icon: "imglogo.png",
  }).show();
  console.log("XYZ");
}
