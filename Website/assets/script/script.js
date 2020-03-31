// let WPurl = "http://sorkat.dreamhosters.com/wp-json/wp/v2/"
// let WPkey = 'yKNuxGFKI2TUsqwc82dCnqTyUzVUO7lz'

// let bandCat = 7;
// let stageCat = 1;

// (async () => {
//     const parseTime = (band) => parseInt(band.acf.time.replace(':', ''))
//     const tableTag = document.querySelector('.table');

//     await getStage();

//     async function getStage() {
//         const xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function () {
//             if (this.readyState == 4 && this.status == 200) {
//                 const stages = JSON.parse(this.responseText);
//                 stages.forEach(stage => {
//                     const stageDiv = document.createElement('div');
//                     stageDiv.id = stage.id;
//                     stageDiv.classList.add('stage');
//                     tableTag.appendChild(stageDiv);//creating div for each stage with its id

//                     const stageNameDiv = document.createElement('h1');// h1 dor name of the stage
//                     stageNameDiv.classList.add('stageName');
//                     stageNameDiv.textContent = stage.acf.stagename;
//                     stageDiv.appendChild(stageNameDiv);

//                     const bandsDiv = document.createElement('div');// div that stores bands on this stage
//                     bandsDiv.classList.add('bandList');
//                     bandsDiv.id = `bandList-${stage.id}`;
//                     stageDiv.appendChild(bandsDiv);

//                     const day1 = document.createElement('div'); //separate divs for each day to store the bands
//                     const day2 = document.createElement('div');

//                     day1.id = `day1${stage.id}`;
//                     day2.id = `day2${stage.id}`;
                    
//                     day1.textContent = '17/01/2020';
//                     day2.textContent = '18/01/2020';

//                     bandsDiv.appendChild(day1);
//                     bandsDiv.appendChild(day2);
//                 });
//             }
//         }
//         xhttp.open('GET', `${WPurl}posts?categories=${stageCat}`, true);
//         xhttp.setRequestHeader('Authorization', `Bearer ${WPkey}`);
//         xhttp.send();
//     }

// await getBands();
//     async function getBands() {
//         const xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function () {
//             if (this.readyState == 4 && this.status == 200) {
//                 let bands = JSON.parse(this.responseText);

//                 const sortedBandList = bands.sort((a, b) => parseTime(a) - parseTime(b));
//                 sortedBandList
//                     .forEach(band => {
//                         const day1 = document.getElementById(`day1${band.acf.stage.ID}`);
//                         const day2 = document.getElementById(`day2${band.acf.stage.ID}`);
//                         const newBand = document.createElement('div');
//                         newBand.classList.add('band')
//                         newBand.id = band.id;

//                         if (band.acf.date == '17/01/2020'){ //deciding which day band is playing
//                             day1.appendChild(newBand);
//                         }else{
//                             day2.appendChild(newBand);
//                         }
//                         const bandTime = document.createElement('p');
//                         bandTime.classList.add('bandName');
//                         bandTime.textContent = band.acf.time
//                         const bandName = document.createElement('p');
//                         bandName.classList.add('bandName');
//                         bandName.textContent = band.acf.name;
//                         newBand.appendChild(bandTime);
//                         newBand.appendChild(bandName);
//                     });
//             }
//         }
//         xhttp.open('GET', `${WPurl}posts?categories=${bandCat}&per_page=100`, true);
//         xhttp.setRequestHeader('Authorization', `Bearer ${WPkey}`);
//         xhttp.send();
//     }
// })()