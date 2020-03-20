var carsArr = []
function selectCar() {
    $("select").html("")
    for (c = 0; c < carsArr.length; c++) {
        $("select").append(`<option value="${carsArr[c].Name}_${carsArr[c].Model}">
                            ${carsArr[c].Name}__${carsArr[c].Model}</option>`)
    }
}
var trips = []
$("#carSubmit").click(function () {
    var carName = $("#carName").val()
    var carModel = $("#carModel").val()
    var carTopSpeed = $("#carTopSpeed").val()
    if (carName == '' || carModel == '' || carTopSpeed == '') alert("Kindly fill all three fields..!")
    else {
        var carAvgSpeed = Number($("#carAvgSpeed").val())
        var carDist = Number($("#carDist").val())
        var carTrips = Number($("#carTrips").val())
        var newCar = new car(carName, carModel, carTopSpeed, carAvgSpeed, carDist, carTrips)
        carsArr.push(newCar)
        console.log(carsArr)
        selectCar()
        alert(`Your new ${carName}-${carModel} details are submitted.!`)
        $("#carName").val("")
        $("#carModel").val("")
        $("#carTopSpeed").val("")
    }
})

class car {
    constructor(name, model, topspeed, avgSpeed, dist, trips, time) {
        this.Name = name || "invalid";
        this.Model = model || "invalid";
        this.TopSpeed = topspeed + "km" || 0;
        this.AverageSpeed = Number(0);
        this.DistanceTravelled = Number(0);
        this.AllTrips = [];
        this.Time = Number(0)
    }
    updateDistance(km) {
        this.DistanceTravelled += km
    }
    updateTime(t) {
        // console.log("time is ok.!  "+t)
        this.Time += t
    }
    updateAvgSpeed() {
        let km = this.DistanceTravelled
        let t = this.Time
        // this.AverageSpeed = (this.DistanceTravelled/ this.Time) 
        this.AverageSpeed = (km / t)
    }
}

$("#tripSubmit").click(function () {
    var selectedCarModel = $("#selectedCarForTrip").val()
    time = Number($("#tripTime").val())
    distance = Number($("#tripDist").val())
    if (selectedCarModel == '#' || time == '' || distance == '') alert("Please fill all the fields..!")
    else {
        flag = 0
        for (var i = 0; i < carsArr.length; i++) {
            if (carsArr[i].Name + '_' + carsArr[i].Model == selectedCarModel) {
                flag = 1
                break
            }
        }
        if (flag == 1) {
            var num = carsArr[i].AllTrips.length + 1
            carsArr[i].updateDistance(distance)
            carsArr[i].updateTime(time)
            carsArr[i].updateAvgSpeed()
            let tripObj = {
                TripNumber: num,
                TripDistance: distance,
                Duration: time
            }
            carsArr[i].AllTrips.push(tripObj)
            // console.log("trips after = "+ num,"  time is  "+time)
            console.log(carsArr[i])
            $("#tripTime").val("")
            $("#tripDist").val("")
        }
        alert(selectedCarModel + " trip details Submitted.!")
    }
})

$("#statusBtn").click(function () {
    $("#statusDiv").html("")
    var selectedCarModel = $("#selectedCarToShowStatus").val()
    for (s = 0; s < carsArr.length; s++) {
        if (carsArr[s].Name + '_' + carsArr[s].Model == selectedCarModel) {
            $("#statusDiv").html(`<h6>
                ${selectedCarModel} travelled ${carsArr[s].DistanceTravelled} KM till now.
            </h6>`)
            break
        }
    }
    alert("status of..!  " + selectedCarModel)
})

$("#showAllTripsBtn").click(function () {
    $("#allTripsDiv").html("")
    carsArr.forEach(obj => {
        $("#allTripsDiv").append(`<h2>${obj.Name + "_" + obj.Model}</h2>`)
        let arr = obj.AllTrips
        arr.forEach(tripObject => {
            $("#allTripsDiv").append(`  <div class="mt-2">Journey : ${tripObject.TripNumber}</div>
                            <div>Journey Distance : ${tripObject.TripDistance} KM</div>
                            <div>Journey time is : ${tripObject.Duration} Hours</div>`)
        });
    })
    alert("You are selected --all cars all Trips-- button")
})