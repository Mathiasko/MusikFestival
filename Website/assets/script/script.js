let WPurl = "http://sorkat.dreamhosters.com/wp-json/wp/v2/"
let WPkey = 'yKNuxGFKI2TUsqwc82dCnqTyUzVUO7lz'

let bandCat = 7;
let stageCat = 1;

function topFunction() {
    document.documentElement.scrollTop = 0;
}

(async () => {

    var topButton = document.getElementById("topButton");

    window.onscroll = function (){
        scrollFunction()
    };

    function scrollFunction() {
        if (document.documentElement.scrollTop > 20){
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    }
    


    const festivalStart = new Date("Jan 17, 2021 10:00:00").getTime();
    let countdown = setInterval(function () {
        let today = new Date().getTime();
        let timeRemaining = festivalStart - today;
        let day = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        let hour = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minute = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        let second = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        document.querySelector(".countdown").innerHTML = day + " D " + hour + " H " + minute + " M " + second + " S ";
        if (timeRemaining < 0) {
            clearInterval(countdown);
            document.querySelector(".countdown").innerHTML = "00:00:00";
        }
    }, 1000);

    const parseTime = (band) => parseInt(band.acf.time.replace(':', ''))
    const tableTag = document.querySelector('.table');
    const firstDay = document.getElementById('firstDay');
    const secondDay = document.getElementById('secondDay');
    const dayContainer = document.querySelector('.dayContainer')

    firstDay.addEventListener('click', function () {
        tableTag.classList.remove('hidden');
        document.getElementById(`day1120`).classList.remove("hidden");// i'm sorry about this
        document.getElementById(`day1137`).classList.remove("hidden");
        document.getElementById(`day1135`).classList.remove("hidden");
        document.getElementById(`day1132`).classList.remove("hidden");
        document.getElementById(`day1129`).classList.remove("hidden");
        document.getElementById(`day1124`).classList.remove("hidden");

        document.getElementById(`day2120`).classList.add("hidden");
        document.getElementById(`day2137`).classList.add("hidden");
        document.getElementById(`day2135`).classList.add("hidden");
        document.getElementById(`day2132`).classList.add("hidden");
        document.getElementById(`day2129`).classList.add("hidden");
        document.getElementById(`day2124`).classList.add("hidden");
    });

    secondDay.addEventListener('click', function () {
        tableTag.classList.remove('hidden');
        document.getElementById(`day1120`).classList.add("hidden");
        document.getElementById(`day1137`).classList.add("hidden");
        document.getElementById(`day1135`).classList.add("hidden");
        document.getElementById(`day1132`).classList.add("hidden");
        document.getElementById(`day1129`).classList.add("hidden");
        document.getElementById(`day1124`).classList.add("hidden");

        document.getElementById(`day2120`).classList.remove("hidden");
        document.getElementById(`day2137`).classList.remove("hidden");
        document.getElementById(`day2135`).classList.remove("hidden");
        document.getElementById(`day2132`).classList.remove("hidden");
        document.getElementById(`day2129`).classList.remove("hidden");
        document.getElementById(`day2124`).classList.remove("hidden");// i'm sorry about this
    });



    await getStage();

    async function getStage() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const stages = JSON.parse(this.responseText);
                stages.forEach(stage => {

                    const stageIconDiv = document.createElement('div');
                    stageIconDiv.id = `icon${stage.id}`
                    stageIconDiv.classList.add('fullBorder');
                    dayContainer.appendChild(stageIconDiv);

                    const stageIcon = document.createElement('img');
                    stageIcon.classList.add('center');
                    stageIcon.src = `assets/images/programIcons/${stage.id}.png`
                    stageIconDiv.appendChild(stageIcon);

                    const stageDiv = document.createElement('div');
                    stageDiv.id = stage.id;
                    stageDiv.classList.add('stage');
                    dayContainer.appendChild(stageDiv);//creating div for each stage with its id

                    const stageDay1 = document.createElement('div');
                    stageDay1.id = `day1${stage.id}`;
                    stageDay1.classList.add('timetable', 'fullBorder', 'hidden')
                    stageDiv.appendChild(stageDay1);

                    const stageDay2 = document.createElement('div');
                    stageDay2.id = `day2${stage.id}`;
                    stageDay2.classList.add('timetable', 'fullBorder', 'hidden')
                    stageDiv.appendChild(stageDay2);
                });
            }
        }
        xhttp.open('GET', `${WPurl}posts?categories=${stageCat}`, true);
        xhttp.setRequestHeader('Authorization', `Bearer ${WPkey}`);
        xhttp.send();
    }

    await getBands();
    async function getBands() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let bands = JSON.parse(this.responseText);

                const sortedBandList = bands.sort((a, b) => parseTime(a) - parseTime(b));
                sortedBandList
                    .forEach(band => {
                        const day1 = document.getElementById(`day1${band.acf.stage.ID}`);
                        const day2 = document.getElementById(`day2${band.acf.stage.ID}`);

                        const newBand = document.createElement('p');
                        newBand.classList.add('pText', 'textPadding', 'whiteText');
                        newBand.id = band.id;
                        newBand.textContent = `${band.acf.time} - ${band.acf.name}`
                        if (band.acf.date == '17/01/2020') { //deciding which day band is playing
                            day1.appendChild(newBand);
                        } else {
                            day2.appendChild(newBand);
                        }
                    });
            }
        }
        xhttp.open('GET', `${WPurl}posts?categories=${bandCat}&per_page=100`, true);
        xhttp.setRequestHeader('Authorization', `Bearer ${WPkey}`);
        xhttp.send();
    }

})()